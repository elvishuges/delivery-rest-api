#!/bin/bash

KEY_NAME=jwt
KEY_PATH=private/keys

if [ ! -d "$KEY_PATH" ]; then
  echo "Criando o diretório para armazenar as chaves -> ${KEY_PATH}..."
  mkdir $KEY_PATH
  echo "Criand o par de chaves..."
else
  echo "Limpando o diretório das chaves..."
  rm -r "${KEY_PATH}"/*
  echo "Recriando as chaves..."
fi

openssl genrsa -out "${KEY_PATH}/${KEY_NAME}.pem" 2048
openssl genrsa -out "${KEY_PATH}/${KEY_NAME}-refresh.pem" 2048
openssl rsa -in "${KEY_PATH}/${KEY_NAME}.pem" -outform PEM -pubout -out "${KEY_PATH}/${KEY_NAME}.pub.pem"
openssl rsa -in "${KEY_PATH}/${KEY_NAME}-refresh.pem" -outform PEM -pubout -out "${KEY_PATH}/${KEY_NAME}-refresh.pub.pem"

echo "Par de chaves gerado com sucesso!"
