# View gets queried by SDK

1. Копируем env файл

```
cp .env-example .env
```

2. Добавляем переменные:
  - **WALLET_SUBSTRATE_ADDRESS** адрес Substrate кошелька

  - **WALLET_SEED** seed фраза данного кошелька

  - **QUERY_HASH_ID** хеш вашего профинансированного представления. Найти можно в [профиле](https://watch.testnet.analog.one/#/profile) во вкладке **Funded Views**

  - **QUERY_HASH_FIELD** поле которые хотим вывести. Найти можно в **Definition** представления

  ![plot](./img/view.png)

3. Устанавливаем зависимости

```
npm i
```

4. Генерируем session key. (!) Требуется только 1 раз

```
node ssk.mjs
```

5. Запускаем 5 раз скрипт для запроса вашего предствавления
```
node query.mjs
```

PS. Пункты 3-5 можно запустить в докере

```
✗ docker run -it --rm -v $(pwd):/app -w /app node:20 bash
root@d64c7c27bb81:/app# node ssk.mjs 
The .apikeys file has been created successfully.
The SESSION_KEY has been updated successfully.
root@7576f174b83d:/app# for i in {1..5}; do node query.mjs; done                                                                                                                                                                              
[]                                                                                                                                                                                                                                            
[]                                                                                                                                                                                                                                            
[]                                                                                                                                                                                                                                            
[]
[]
```
