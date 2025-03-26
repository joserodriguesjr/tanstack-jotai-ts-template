import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { toast } from '@/shared/components/ui/sonner';

export function SwPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
          setTimeout(() => setShowPrompt(true), 2000);
        }
      });
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const swPromise = navigator.serviceWorker.register('sw.js');
      toast.promise(swPromise, {
        loading: 'Registering Service Worker...',
        success: 'Service Worker Registered!!!!!!!!!!!!!!!!!! 🎉',
        error: 'Failed to register Service Worker ❌',
      });
      // const sw = await swPromise;
      // sw.addEventListener('updatefound', () => {
      //   const newWorker = sw.installing;
      //   newWorker?.addEventListener('statechange', () => {
      //     if (
      //       newWorker.state === 'installed' &&
      //       navigator.serviceWorker.controller
      //     ) {
      //       window.location.reload(); // Force refresh when a new SW is installed
      //     }
      //   });
      //   navigator.serviceWorker.addEventListener('controllerchange', () => {
      //     window.location.reload(); // Ensures new content is loaded
      //   });
      // });
    } catch (error) {
      console.error('[SW] Registration Failed:', error);
    } finally {
      setShowPrompt(false);
    }
  };

  return (
    <>
      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Offline Mode?</DialogTitle>
            <DialogDescription>
              This app can work offline by caching assets. Would you like to
              enable it?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrompt(false)}>
              Maybe Later
            </Button>
            <Button onClick={registerServiceWorker}>Enable Offline</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
