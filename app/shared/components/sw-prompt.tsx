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
      setTimeout(() => setShowPrompt(true), 2000);
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const swPromise = navigator.serviceWorker.register('/sw.js');
      await toast.promise(swPromise, {
        loading: 'Registering Service Worker...',
        success: 'Service Worker Registered! 🎉',
        error: 'Failed to register Service Worker ❌',
      });
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
