from bs4 import BeautifulSoup
import requests
import random
import boto3
import json
import os

def lambda_handler(event, context):
  r = requests.get('https://www.basketball-reference.com/leagues/NBA_2024_per_game.html')
  fp = {}
  if r.status_code == 200:
      soup = BeautifulSoup(r.content, 'html.parser')
      table = soup.find('table')
      for r in table.find_all('tr'):
          td = r.find_all('td')
          if len(td) == 0: continue
          name = td[0].get_text()
          pts = float(td[-1].get_text())
          tov = float(td[-3].get_text())
          blk = float(td[-4].get_text())
          stl = float(td[-5].get_text())
          ast = float(td[-6].get_text())
          reb = float(td[-6].get_text())
          fantasy_points = pts * 1 + reb * 1.2 + ast * 1.5 + stl * 2 + blk * 2 + tov * -1
          fp[name] = fantasy_points
  r = requests.get('https://www.basketball-reference.com/contracts/players.html#player-contracts')
  salaries = {}
  if r.status_code == 200:
      soup = BeautifulSoup(r.content, 'html.parser')
      table = soup.find('table')
      for r in table.find_all('tr'):
          td = r.find_all('td')
          if len(td) == 0: continue
          name = td[0].get_text()
          salary = td[2].get_text()
          salary = salary[1:].replace(',', '')
          if not salary: continue
          salaries[name] = float(salary)

  N = 12
  SIZE = 6
  players, costs, profits = [], [], []
  while len(players) < N:
      player = random.choice(list(fp.keys()))
      if player in salaries and player in fp and player not in players:
          costs.append(salaries[player])
          profits.append(fp[player])
          players.append(player)
  max_amount = int(sum(costs) / N) * SIZE


  best_path = ['']
  max_profit = [0]
  def dfs(i, path, p):
      if i == len(players):
          if p > max_profit[0]:
              max_profit[0] = p
              best_path[0] = path
          return
      
      # Option 1: Skip current player
      a = dfs(i + 1, path, p)
      # Option 2: Get current player
      if costs[i] + sum([costs[i] for i in range(N) if path[i] == '1']) <= max_amount:
          new_path = path[:i] + '1' + path[i+1:]
          dfs(i + 1, new_path, p + profits[i])
  dfs(0, '0'*N, 0)

  data = {}
  data['options'] = []
  data['optimal'] = { 
    'profit': max_profit[0],
    'cost': sum([costs[i] for i in range(N) if best_path[0][i] == '1']), 
    'players': [players[i] for i in range(N) if best_path[0][i] == '1']
  }
  for i in range(N):
    data['options'].append({ 'name': players[i], 'cost': costs[i], 'profit': profits[i] })
  
  sess = boto3.session.Session(
      aws_access_key_id=os.getenv('ACCESS_KEY_ID'),
      aws_secret_access_key=os.getenv('SECRET_KEY'),
  )
  s3 = sess.client('s3')
  file = s3.put_object(Body=json.dumps(data), Bucket='nabsack', Key='data.json')
  
  return data
