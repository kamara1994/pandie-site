"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Currencies PayPal supports — others fall back to USD
const PAYPAL_CURRENCIES = new Set([
  "AUD","BRL","CAD","CNY","CZK","DKK","EUR","GBP",
  "HKD","HUF","ILS","JPY","MXN","MYR","NOK","NZD",
  "PHP","PLN","RUB","SEK","SGD","THB","TWD","USD","ZAR",
]);

type Props = {
  amount: string;
  currency: string;
  frequency: "one-time" | "monthly";
  donorName: string;
  donorEmail: string;
  phone: string;
  message: string;
  anonymous: boolean;
  emailUpdates: boolean;
};

// Inner component — only mounted when clientId is confirmed present
function PayPalInner({
  clientId,
  amount,
  currency,
  frequency,
  donorName,
  donorEmail,
  phone,
  message,
  anonymous,
  emailUpdates,
}: Props & { clientId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  const amountNum = Number(amount);
  const isValidAmount = amountNum > 0 && !Number.isNaN(amountNum);

  const paypalCurrency = PAYPAL_CURRENCIES.has(currency.toUpperCase())
    ? currency.toUpperCase()
    : "USD";
  const currencyMismatch = paypalCurrency !== currency.toUpperCase();

  // createOrder is called when the buyer clicks the PayPal button
  const createOrder = async () => {
    if (!donorEmail || !donorEmail.includes("@")) {
      setError("Please enter your email address above before donating with PayPal.");
      throw new Error("Email required");
    }
    if (!isValidAmount) {
      setError("Please enter a valid donation amount.");
      throw new Error("Invalid amount");
    }

    setError("");

    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountNum,
        currency: paypalCurrency,
        donorName,
        donorEmail,
        phone,
        message,
        anonymous,
        emailUpdates,
        frequency,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.id) {
      setError(data.error ?? "Failed to initiate PayPal. Please try the card option above.");
      throw new Error(data.error ?? "Order creation failed");
    }

    return data.id as string;
  };

  // onApprove is called after the buyer approves on PayPal
  const onApprove = async (data: { orderID: string }) => {
    setIsCapturing(true);
    setError("");
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: data.orderID,
          donorName,
          donorEmail,
          amount: amountNum,
          currency: paypalCurrency,
          frequency,
          anonymous,
          message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        router.push(
          `/donate/success?donation_id=${result.donationId}&txn_id=${result.transactionId}`,
        );
      } else {
        setError(result.error ?? "Payment was not completed. Please try again.");
        setIsCapturing(false);
      }
    } catch {
      setError("Something went wrong. Please try again or use the card option above.");
      setIsCapturing(false);
    }
  };

  const onError = () => {
    setError("PayPal payment failed. Please try again or donate with a card above.");
  };

  const onCancel = () => {
    setError("PayPal payment was cancelled. You can try again or use a card above.");
  };

  return (
    <div>
      {frequency === "monthly" && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
          <strong>Note:</strong> Monthly recurring donations are processed via the card option
          above. PayPal accepts one-time donations here.
        </div>
      )}

      {currencyMismatch && (
        <div className="mb-4 rounded-lg border border-[#e7dfd0] bg-[#fcfaf6] px-4 py-3 text-sm text-[#5f6663]">
          PayPal will process your donation in <strong>USD</strong> ({currency} is not currently
          supported by PayPal).
        </div>
      )}

      {isCapturing && (
        <div className="mb-4 rounded-lg bg-[#214c34]/10 px-4 py-3 text-sm font-semibold text-[#214c34]">
          Confirming your PayPal donation — please wait…
        </div>
      )}

      <PayPalScriptProvider
        key={`${paypalCurrency}-${frequency}`}
        options={{
          clientId,
          currency: paypalCurrency,
          intent: "capture",
          components: "buttons",
          disableFunding: "credit,card,paylater",
        }}
      >
        {/* PayPal button */}
        <div className="mb-2">
          <PayPalButtons
            fundingSource="paypal"
            style={{ layout: "horizontal", height: 48, tagline: false, shape: "rect" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={onCancel}
            disabled={isCapturing || !isValidAmount}
            forceReRender={[amountNum, paypalCurrency]}
          />
        </div>

        {/* Venmo button — auto-hidden by PayPal SDK when not eligible */}
        <PayPalButtons
          fundingSource="venmo"
          style={{ layout: "horizontal", height: 48, tagline: false, shape: "rect" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          disabled={isCapturing || !isValidAmount}
          forceReRender={[amountNum, paypalCurrency]}
        />
      </PayPalScriptProvider>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <p className="mt-3 text-[12px] leading-5 text-[#9a9490]">
        Venmo appears automatically when available for your account and location (US only).
        No card or bank details are shared with Pandie Foundation.
      </p>
    </div>
  );
}

// Outer component — guards against missing client ID at runtime
export default function PayPalDonation(props: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) return null;
  return <PayPalInner clientId={clientId} {...props} />;
}
