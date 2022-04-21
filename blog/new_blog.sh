#!/bin/bash


if [[ -z $1 ]]; then
	echo "Enter arg_1 or -h for help"
	exit
fi
if [[ $1 = -h ]]; then
	echo "arg_1:"
	echo -e "\t-h for help"
	# Currently -c will delete new lines and tabs even if they are in the hook. 
	echo -e "\t-c for line compression (it isn't necessary, but it might speed up requests). arg_2 will be input, arg_3 will be output."
	echo -e "\tpath+filename of the database."
	echo "arg_2: path+filename of the blog source html file"
fi
if [[ $1 = -c ]]; then
	touch $3
	tr -d "\n\t" < $2 > $3
	exit
fi


if [[ -z $2 ]]; then
	echo "Enter arg_2"
	exit
fi
DATABASE=$1
STARTFILE=$2
if [[ ! -e $STARTFILE ]]; then
	echo "the start file was not found... exiting"
	exit
fi
INIT="false"
if [[ ! -e $DATABASE ]]; then
	INIT="true"
	echo "creating database"
	touch $DATABASE
	if [[ ! -e $DATABASE ]]; then
		echo "The file does not exist"
		exit
	fi
	echo '{' >> $DATABASE
	echo '}' >> $DATABASE
fi

while [[ -z $NAME ]]; do
	echo "Enter the blog's name:"
	read NAME
done

#HOOK=""
#LINE="placeholder"
#NL='\n'
#echo "Enter the summary/hook (when you are done, enter a blank line) (also, this program will expand any escaped characters):"
#read LINE
#HOOK=$LINE
#while [[ ! -z $LINE ]]; do
#	read LINE
#	if [[ -z $LINE ]]; then
#		break
#	fi
#	HOOK=$HOOK$NL$LINE
#done

HOOK=""
HOOKF=/tmp/new_blog_hook.txt
touch $HOOKF
if [[ ! -e $HOOKF ]]; then
	echo "$HOOKF was unable to be created. Safely exiting."
	exit
fi
echo "Write the hook in this file. This file will disappear after you submit it. (this line is not ignored by the parser)" > $HOOKF
$EDITOR $HOOKF
HOOK=$(cat $HOOKF)
rm $HOOKF



TMP=/tmp/new_blog_prepend.txt
touch $TMP
if [[ ! -e $TMP ]]; then
	echo "$TMP was unable to be created. Safely exiting."
	exit
fi
DUP=/tmp/new_blog_database_duplicate.txt
touch $DUP
if [[ ! -e $DUP ]]; then
	echo "$DUP was unable to be created. Safely exiting."
	exit
fi
sed -i '1 d' $DATABASE # Delete first line in database 
cp $DATABASE $DUP

echo -e '{' >> $TMP
echo -e '\t"'$NAME'": {' >> $TMP
DATE=$(date --utc)
echo -e '\t\t"creation_time": "'$DATE'",' >> $TMP
echo -e '\t\t"hook": "'$HOOK'",' >> $TMP
echo -e '\t\t"start_file": "'$STARTFILE'"' >> $TMP
if [[ $INIT = "true" ]]; then
	echo -e '\t}' >> $TMP
else
	echo -e '\t},' >> $TMP
fi
cat $TMP $DUP > $DATABASE
rm $TMP
rm $DUP
echo "Blog should be successfully created."
