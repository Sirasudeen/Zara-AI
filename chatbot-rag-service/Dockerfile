FROM python

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN python --version

EXPOSE 5000


CMD gunicorn -w 4 -b 0.0.0.0:$PORT app:app  