iPython Notebook Guide
======================

Installing
----------
If you have pip installed, you can install ipython with:
```sh
pip install ipython[all]
```

Running locally
---------------
You can open ipython notebook from the command line with:
```sh
ipython notebook
```

Though you may want to open with these options:
```sh
ipython notebook --pylab inline --notebook-dir='/path/to/directory/where/ipython_notebooks/live'
```

This command will automatically open a browser window pointing to the local server where iPython notebook is running. Make sure you replace `/path/to/directory/where/ipython_notebooks/live` with the actual path to the directory where you want your ipython notebooks to live. If you plan to automate this process, bookmark this page before doing so.


Auto-start on login
-------------------
Before you start this process, make sure ipython notebook is working for you by running through the steps in the previous section. You'll also need to know the absolute path to ipython. You can find this by opening Terminal and running:
```sh
which ipython
```

It will probably be something like: `/usr/local/bin/ipython`. Once you have the absolute path:

1. Open Automator
2. Select 'New Document'
3. Select 'Application'
4. Click 'Utilities' in the far left panel and then double click 'Run Shell Script' in the second panel
5. In the Shell window, type:
	```sh
	/usr/local/bin/ipython notebook --no-browser  --pylab inline --notebook-dir='/path/to/directory/where/ipython_notebooks/live'
	```
	Remember to replace `/usr/local/bin/ipython` with the absolute path to ipython on your computer. Also, make sure you specify the correct notebook-dir.

6. File -> Save and save somewhere that it won't get deleted (e.g. `/Users/adamhajari/Applications/`)
7. Go to System Preferences -> Accounts -> Login items
8. Add this app

Now when you boot up your laptop, an iPython notebook server will also startup at the usual port (the url you bookmarked in the "Running locally" section of this document).
