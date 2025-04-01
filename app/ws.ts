// todo: improve ws

import {
  defineEventHandler,
  defineWebSocket,
} from '@tanstack/react-start/server';
import type { Peer } from 'crossws';

const topicSubscriptions = new Map<string, Set<Peer>>();

export default defineEventHandler({
  handler() {},
  websocket: defineWebSocket({
    async upgrade(req) {
      console.log(`[ws] upgrading ${req.url}...`);

      // const user = await yourOwnAuthMethod(req); // e.g. check jwt

      // deny unauthorized connections
      // if (!user) {
      //   return new Response(null, { status: 401 });
      // }

      // auth successful
      // req.context.user = {
      //   id: user.id,
      //   name: user.name,
      // };

      return {
        headers: {},
      };
    },

    open(peer) {
      // console.log(peer.context.user); // { id: 1, name: 'Nate' }
      console.log(`[ws] open: ${peer.id}`);

      // Inscrição padrão ao conectar (se necessário)
      subscribeToTopic(peer, 'general');

      sendMessage(peer, {
        user: 'server',
        message: `Connected. Available topics: chat, types, general.`,
      });
    },

    async message(peer, message) {
      const text = message.text();
      console.log('[ws] message', peer.id, text);

      try {
        const data = JSON.parse(text);
        if (data.topic) {
          switch (data.action) {
            case 'subscribe':
              return subscribeToTopic(peer, data.topic);
            case 'unsubscribe':
              return unsubscribeFromTopic(peer, data.topic);
            case 'send':
              if (data.message) {
                return broadcastMessage(peer, data.topic, data.message);
              } else {
                return sendMessage(peer, {
                  user: 'server',
                  message: 'Invalid message format',
                });
              }
            default:
              return sendMessage(peer, {
                user: 'server',
                message: 'Invalid action',
              });
          }
        }
      } catch (error) {
        console.error(
          `[ws] Invalid message format: ${text}\n[ws] Error: ${error}`,
        );
      }
    },

    async close(peer) {
      console.log('[ws] close', peer.id);
      removePeerFromAllTopics(peer);
    },

    async error(peer, error) {
      console.log('[ws] error', peer.id, error);
    },
  }),
});

function sendMessage(peer: Peer, data: unknown, topic?: string) {
  const message = JSON.stringify(data);

  peer.send(message);
  if (topic) peer.publish(topic, message);
}

// 🔹 Envia mensagem direta para um usuário
// function sendMessage(peer: Peer, data: unknown) {
//   peer.send(JSON.stringify(data));
// }

// 🔹 Gerencia inscrição do usuário a um tópico
function subscribeToTopic(peer: Peer, topic: string) {
  if (!topicSubscriptions.has(topic)) {
    topicSubscriptions.set(topic, new Set());
  }

  topicSubscriptions.get(topic)!.add(peer);
  peer.subscribe(topic);

  console.log(`[ws] ${peer.id} subscribed to ${topic}`);

  sendMessage(peer, {
    user: 'server',
    message: `You subscribed to ${topic}`,
  });
}

// 🔹 Remove usuário de um tópico
function unsubscribeFromTopic(peer: Peer, topic: string) {
  if (topicSubscriptions.has(topic)) {
    topicSubscriptions.get(topic)!.delete(peer);
  }

  peer.unsubscribe(topic);
  console.log(`[ws] ${peer.id} unsubscribed from ${topic}`);

  sendMessage(peer, {
    user: 'server',
    message: `You unsubscribed from ${topic}`,
  });
}

// 🔹 Envia mensagem apenas para os inscritos no tópico
function broadcastMessage(peer: Peer, topic: string, message: string) {
  if (!topicSubscriptions.has(topic)) {
    return sendMessage(peer, {
      user: 'server',
      message: `Topic "${topic}" does not exist.`,
    });
  }

  const msg = { user: peer.id, topic, message };
  sendMessage(peer, msg, topic);
  // topicSubscriptions.get(topic)!.forEach((p) => p.send(JSON.stringify(msg)));

  console.log(`[ws] ${peer.id} sent message to ${topic}: ${message}`);
}

// 🔹 Remove usuário de todos os tópicos ao desconectar
function removePeerFromAllTopics(peer: Peer) {
  topicSubscriptions.forEach((peers, topic) => {
    if (peers.has(peer)) {
      peers.delete(peer);
      console.log(`[ws] ${peer.id} removed from ${topic}`);
    }
  });
}
