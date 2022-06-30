# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /minesweeper
COPY requirements.txt /minesweeper/
RUN pip install -r requirements.txt
COPY . /minesweeper/