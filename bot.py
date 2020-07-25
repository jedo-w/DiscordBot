import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.event
async def on_ready():
    print(">> Bot is online")

@bot.event
async def on_member_join(member):
    channel = bot.get_channel(736633578309288127)
    await channel.send(f'{member} join!')
    print(F'{member} join!')

@bot.event
async def on_member_remove(member):
    channel = bot.get_channel(736633578309288127)
    await channel.send(f'{member} leave!')
    print(F'{member} leave!')

@bot.command()
async def ping(ctx):
    await ctx.send(f'{round(bot.latency*1000)}(ms)')



bot.run("NzExMjY2MzI1NTIzMzMzMjEz.XsAgYg.gWvuhPkuviZaE-0Q7-o-lKxMR4w")