import { useEffect } from 'react';

interface AdSlotProps {
  adSlot: string;
  format?: string;
  responsive?: boolean;
}

export const AdSlot = ({
  adSlot,
  format = 'auto',
  responsive = true,
}: AdSlotProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '250px',
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};
