from fastapi import FastAPI
from api.routes import router
from fastapi.middleware.cors import CORSMiddleware
import fastf1
import os

# Add this - enables caching to prevent memory spikes
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

app = FastAPI(title="F1Nexus API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)