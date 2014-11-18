Group_chat_stomp
================

groupchat using stomp protocol, publish/subscribe one-to-many pattern

This is a Massey University 159339 Internet Programming project.
The purpose of this project is to write a client program  to interact with ActiveMQ MOM to realize micro-blogging/groupchat
Only HTML and JavaScript will be used to realize this function.
The AcriveMQ MOM is deployed on the Amazon Cloud by the tutor of this paper so it may not last long.

The web application uses stomp.js library to form client program via WebSockects api.
The program read in a given XML file with required URL to connect to the Active MO broker and a list of all topics.
Users can login to the service with their own Id and password and publish text to thier own topics and subscribe/desubscribe...
to any topics in the list which the whole program acts like a chatting room, the message will be sent and received instantly.
