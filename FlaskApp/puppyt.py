from app.services.imports import ctypes, os, platform, subprocess, sys,time, importlib, pathlib

#Colors

RESET = "\033[0m"

# Standard Foreground Colors
BLACK = "\033[30m"
GREY = "\033[90m"
RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
BLUE = "\033[34m"
MAGENTA = "\033[35m"
CYAN = "\033[36m"
WHITE = "\033[37m"

# flask app.py main entry point
BASE_DIR = pathlib.Path(__file__).resolve().parent
app_py = BASE_DIR / "app" / "app.py"
YT_DLP = BASE_DIR / "bin" / "yt-dlp.exe"


# Determine the current operating system
if platform.system() == "Windows":
    cur_os = "win"
elif platform.system() == "Linux":
    cur_os = "linux"
else:
    cur_os = "mac"

print(f"Detected OS: {cur_os}")


def cls():
    if cur_os == "win":
        os.system("cls")
    else:
        os.system("clear")


cls()

# Installing dependencies
while True:
    pipcheck = input(
        f"{YELLOW}Check PIP dependencies?{RESET} {GREY}(if unsure, press Enter to continue.)\n"
        f"[{RESET}{GREEN}Y{RESET}{GREY}/{RESET}{RED}n{RESET}{GREY}]{RESET}: "
    )
    if pipcheck.lower() in ["n", "no"]:
        break
    elif pipcheck.lower() in ["y"," ","","yes"]:
        print("Installing dependencies...")
        packages = {"Flask": "flask", "rich": "rich", "pyperclip": "pyperclip"}

        for package, module in packages.items():
            try:
                importlib.import_module(module)

            except ImportError:
                try:
                    subprocess.run(
                        [sys.executable, "-m", "pip", "install", package], check=True
                    )

                except subprocess.CalledProcessError as e:
                    print(f"Error occurred while installing {package}: {e}")
                    input("Press Enter to exit...")
                    sys.exit(1)
        break
    else:
        cls()
        

import pyperclip

# Check for administrative privileges
if cur_os == "win":

    def is_admin():
        return ctypes.windll.shell32.IsUserAnAdmin()
    
else:

    def is_admin():
        return os.geteuid() == 0
    
if not is_admin():
    print(
        f"{RED}Puppyt runs better with administrative privileges, if you prefer to run it as a regular user, you can ignore this message.{RESET}"
    )


print(f"{GREEN}Launching Puppyt...{RESET}")
try:
    # check=True forces an exception if the child script exits with an error
    subprocess.run(
        [sys.executable, app_py],
        # stdout=subprocess.DEVNULL,
        # stderr=subprocess.PIPE,  # Capture errors instead of discarding them
        # text=True,
        # check=True
    )
except subprocess.CalledProcessError as e:
    print(f"The script crashed! Error log:\n{e.stderr}")
