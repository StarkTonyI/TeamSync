export const ws = new WebSocket('wss://working-project-teamsync.up.railway.app');


export function connectToWs(handleMessage:any) {
    ws.addEventListener('message', handleMessage);
      ws.addEventListener('close', () => {
        console.log('Disconnected. Trying to reconnect.');
        setTimeout(() => connectToWs(handleMessage), 1000); // Pass handleMessage explicitly
    });
      return ws;
    }