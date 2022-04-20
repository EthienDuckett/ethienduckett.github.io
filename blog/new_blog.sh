#!/bin/bash


if [[ -z $1 ]]; then
	echo "Enter arg_1 or -h for help"
	exit
fi
if [[ $1 = -h ]]; then
	echo "arg_1: path+filename of the database."
	echo "arg_2: path+filename of the blog source html file"
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
if [[ ! -e $DATABASE ]]; then
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

HOOK=""
LINE="placeholder"
NL='\n'
echo "Enter the summary/hook (when you are done, enter a blank line) (also, this program will expand any escaped characters):"
read LINE
HOOK=$LINE
while [[ ! -z $LINE ]]; do
	read LINE
	if [[ -z $LINE ]]; then
		break
	fi
	HOOK=$HOOK$NL$LINE
done

sed -i '1 d' $DATABASE # Delete first line in file 
TMP=/tmp/new_blog_prepend.txt
DUP=/tmp/new_blog_database_duplicate.txt
touch $TMP
cp $DATABASE $DUP

echo -e '{' >> $TMP
echo -e '\t"'$NAME'": {' >> $TMP
DATE=$(date --utc)
echo -e '\t\t"creation_time": "'$DATE'"' >> $TMP
echo -e '\t\t"hook": "'$HOOK'"' >> $TMP
echo -e '\t\t"start_file": "'$STARTFILE'"' >> $TMP
echo -e '\t},' >> $TMP
cat $TMP $DUP > $DATABASE
rm $TMP
rm $DUP
echo "Blog should be successfully created."
