Install Instructions: (Read carefully!)

1. Disable your Network card or pull the network cable.
   And make sure you dont have any of those entries in your hosts file
   127.0.0.1 lmlicenses.wip4.adobe.com
   127.0.0.1 lm.licenses.adobe.com
   Lets start clean :)

2. Install Adobe CC Application with a serial generated from our keymaker ( do not close the keygen!).
   Click on Install (I have purchased)
   Click on Sign In (make sure your network connection is offline)
   Click on Connect Later
   Accept the License Agreement and enter the serial generated from our Keygen
   Wait ... When the error "Please connect to the internet and retry" shows, click connect later.


3. Launch an Adobe application (Photoshop, Illustrator etc).

4. Click on "Having trouble connecting to the internet ?" 
   Click on Offline Activation

5. Click on Generate a requets Code 
   A request code will be generated. Use it with the serial you used to install your adobe application 
   to generate your activation code. Copy it back and Click on Activate.

6. Click on Launch or close the Window. Exit The Adobe Application

7. Run Osx/disable_activation_osx as root
   if you dont know how to do that, open a terminal window
   then issue sudo -s, a root shell will open
   then simply do "sh disable_activation_osx"  w/o the ""
   or ./disable_activation_osx( make it executable chmod 755 disable_activation_osx 
   you do that from the folder where disable_activation_osx is. (just copy it anywhere on your hdd) 

   Or do it manually
   Add the text below to the bottom of your hosts file. (/private/etc/hosts /et/hosts)

# Adobe Blocker

127.0.0.1 lmlicenses.wip4.adobe.com
127.0.0.1 lm.licenses.adobe.com
127.0.0.1 na1r.services.adobe.com
127.0.0.1 hlrcv.stage.adobe.com
127.0.0.1 practivate.adobe.com 
127.0.0.1 activate.adobe.com


8. After it has been activated re-enable you Network card and run the adobe updater to update your software to the latest version.

9. Enjoy!


Note: If you encounter any issues with a previous installation / crack, please
uninstall Captivate and delete those folders :

./Library/Application Support/Adobe/SLStore   <------------- BE CAREFUL IF YOU HAVE OUR MASTER COLLECTION INSTALLED, DELETE ONLY THE LATEST LICENSE FILE
./Library/Application Support/Adobe/SLCache


*********************************
* Accept no imitation / X-FORCE *
*-------------------------------*
*      We are the world #1      *
*********************************

