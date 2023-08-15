"use client";

import "./globals.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SphereProvider } from "@spherelabs/react";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Providers({ children }: { children: React.ReactNode }) {
  const endpoint =
    "https://rpc.helius.xyz/?api-key=5b61f350-4c99-4f81-8331-246906ba53dc";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <SphereProvider paymentLinkId="paymentLink_9fa98f6bfb684c429db94eecfd2cd208">
            {children}
          </SphereProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
