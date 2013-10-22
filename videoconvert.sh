#!/bin/bash
file=$(basename "$1")
ext="${file##*.}"
base=$(basename "$file" ."$ext")
BITRATE=500k

echo "Converting: ogv (Theora/Vorbis)"
#ffmpeg -i "$file" -acodec libvorbis "$base".ogv

echo "Converting: webm (VP8/Vorbis)"
ffmpeg -i "$file" -vcodec libvpx -acodec libvorbis \
  -b $BITRATE "$base".webm

#ffmpeg -i $file -acodec libfaac -vcodec libx264 "`basename $1 $ext`.mp4"
echo "mp4 (H.264/AAC)"
ffmpeg -i "$file" -vcodec libx264 -b $BITRATE _"$base".mp4

#REM mp4  (H.264 / ACC)
#"c:\program files\ffmpeg\bin\ffmpeg.exe" -i %1 -b 1500k -vcodec libx264 -vpre slow -vpre baseline                                           -g 30 -s 640x360 %1.mp4
#REM webm (VP8 / Vorbis)
#"c:\program files\ffmpeg\bin\ffmpeg.exe" -i %1 -b 1500k -vcodec libvpx                              -acodec libvorbis -ab 160000 -f webm    -g 30 -s 640x360 %1.webm
#REM ogv  (Theora / Vorbis)
#"c:\program files\ffmpeg\bin\ffmpeg.exe" -i %1 -b 1500k -vcodec libtheora                           -acodec libvorbis -ab 160000            -g 30 -s 640x360 %1.ogv
#REM jpeg (screenshot at 10 seconds)
#"c:\program files\ffmpeg\bin\ffmpeg.exe" -i %1 -ss 00:10 -vframes 1 -r 1 -s 640x360 -f image2 %1.jpg
