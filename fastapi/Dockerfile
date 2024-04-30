FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python

COPY . .

EXPOSE 8000

CMD ["python", "./src/main.py"]