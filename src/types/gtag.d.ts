interface Window {
  gtag: (
    command: 'event' | 'config' | 'set',
    eventName: string,
    eventParams?: any
  ) => void;
  dataLayer: any[];
}