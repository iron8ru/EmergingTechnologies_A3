# EmergingTechnologies_A3
Emerging Technologies Group Assignment 3 - IDE compailer web application with Docker Swarm: Java, Python and C

Documentacao Initial - Class 15/05/24

Step 1)
 we wrote a server that compile and run java. Include explanation. This server works this way:

Step 2)
than had to make this code generic and accept anotehr language.

now the compile and run comment will take 3 argument ( 0 , 1, 2)
e o servidor vai ler apenas os argumentos 1 e 2. que no caso serao o compile comand e o run comand.
a language tb esta modular, de acordo com a que for passada.

Step 3)
make containers
copiamos o codigo pronto e colamos em pastas individuais cada uma chamada c, py and java.
dai o codigo dentro de cada um agora so compile and run sua propria lingua. cada pastinha vai ter a sua docker file, que foi feita na chatgpt. 

ryder:
o ryder vai ser agora quem recebe da UI qual language is, o text, faz decoded tex e vai enviar ele para o respectivo container.
dai cada cointaner. o ryder tem agora seu proprio node.js codigo.

step4)
cada docker file foi criada, no total 4. cada jason traz as configuracoes e dependencys encessarias. cada docker file traz os comandos que o docker precisar construir naquela imagem (ele vai checar a json e construir a imagem correta) nessa caso cada uma traz o comando de installar nao so as dependences mas tb 

 depois disso vamos criar o comando para o docker swarm e docjer compose. copiamos o modelo da aplicacao passada e adaptamos assim quando rodamos build docker compose cada service vai construir automaticamente. ja que dentro da file tem cada service.
