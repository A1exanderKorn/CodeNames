import gensim.downloader as api
import numpy as np
import pandas as pd

# Загружаем предобученную русскую модель Word2Vec (можно заменить на другую)
model = api.load("word2vec-ruscorpora-300")
# Загружаем слова из файла
file_path = "words.txt"
with open(file_path, "r", encoding="utf-8") as file:
    words = [line.strip() for line in file.readlines() if line.strip()]

# Создаём пустую матрицу
matrix = np.zeros((len(words), len(words)))
# Вычисляем коэффициенты близости
# print(list(model.key_to_index.keys())[:20])counter = 1
counter = 0
for i, word1 in enumerate(words):
    # print(word1 in model.key_to_index)
    word_noun = word1.lower() + "_NOUN"
    found_words = [w for w in model.key_to_index if word1 in w]
    # if counter % 10 == 0:
    #     print(counter)
    counter += 1
    word_sim1 = found_words[0] if found_words else None
    if not found_words:
         print(word1)
    for j, word2 in enumerate(words):
            word_noun = word2.lower() + "_NOUN"
            found_words = [w for w in model.key_to_index if word2 in w]
            
            word_sim2 = found_words[0] if found_words else None
            if word_sim1 in model.key_to_index and word_sim2 in model.key_to_index:
                matrix[i, j] = model.similarity(word_sim1, word_sim2)
            else:
                matrix[i, j] = np.nan  # Если слова нет в модели

# Записываем в DataFrame
df = pd.DataFrame(matrix, index=words, columns=words)

# Сохраняем в Excel
df.to_excel("word_similarity_matrix.xlsx")

print("Матрица сохранена в 'word_similarity_matrix.xlsx'")