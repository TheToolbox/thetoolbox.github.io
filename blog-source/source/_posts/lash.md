---
title: lash
date: 2016-06-24 17:33:47
categories: bash
tags: bash, terminal, 
permalink:
---

SSH keys need to be stored securely, but often need to be used from multiple locations. They could be kept on a single machine, a flash drive, or a network location. Each of them has their perks:

|KeyStore       | Usable anywhere | Safe from loss | Security Considerations|
|-------------------------------------------------------------------|
|Flash Drive    | ✓               | X       | Probably should be encrypted. Also you might need to keep extra copies in case it is lost (which is a security risk unto itself) |
|Single Machine | X               | X       | Unencrypted by default. Need to protect the machine. |
|Network Drive  | ✓               | ✓       | Need to keep access restricted. Keeping it encrypted when stored sounds nice too! |

Let's not overcomplicate it though. This is mostly about convenience. Allowing a bunch of keys to have access to machines just sounds dangerous, so I can't just allow access from each machine's different key that I want to connect from. Luckily LastPass provides an awesome CLI, and takes care of the whole encryption situation. They even have the ability to specifically log ssh keys into their interface. Thus, I put together `lash`, which takes advantage of this, and is a nice easy addition to your `.bashrc`.

Dependencies:

[Lastpass-CLI](https://github.com/lastpass/lastpass-cli#installing-on-linux)

Usage:
```bash
# Simply prepend your normal ssh options with the name of the key in LastPass you want to use (the -i flag is implied)
$ lash keyname sshoptions
# Example:
$ lash toolboxkey toolbox@oett.io
```

For your `.bashrc`:

```bash
lash () {
	argz=($@);                                         # get array of arguments
	argz="${argz[@]:1}";                               # get all the arguments but the first one (to pass on to ssh)
	keyfile="$HOME/.$1.temp.key" &&                    # setup keyfile name 

	# ssh requires keys to be in files, as opposed to in arguments, as `ps` and others would leak the credentials 
	rm $keyfile 2> /dev/null;                          # ensure the keyfile is gone
	touch $keyfile &&                                  # recreate the keyfile file
	chmod 700 $keyfile &&                              # make sure the correct file permissions before storing it
	lpass show --field='Private Key' $1 > $keyfile &&  # use the awesome lastpass cli to pull down the private key
	ssh -i $keyfile $argz;                             # actually ssh!
	rm $keyfile;                                       # get rid of the file when done
}
```

THere's plenty of room for improvement (probably enough to warrant a full program):
 - Unfortunately the keys themselves are still unencrypted while ssh is using them
 - A method for browsing the keys from the command line wouldn't be a bad addition
 - This might make more sense as a full package

I'd love to hear suggestions!

Hopefully helpful