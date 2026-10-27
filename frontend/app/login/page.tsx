"use client";
import { useState } from "react";
import { AnnouncementBar, Header, Footer, MobileDock } from "@/components/chrome";

export default function LoginPage() {
  const [stage, setStage] = useState<"email" | "code">("email");
  return (
    <>
      <AnnouncementBar />
      <Header solid />
      <main className="inner-page login-page">
        <div className="login-card">
          <h1>Sign in</h1>
          {stage === "email" ? (
            <>
              <p>Enter your email and we will send you a sign-in code. No password needed.</p>
              <form onSubmit={(e) => { e.preventDefault(); setStage("code"); }}>
                <input required type="email" placeholder="Email address" />
                <button className="btn primary full" type="submit">Continue With Email</button>
              </form>
              <p className="login-note">New here? An account is created automatically when you place your first order. Order tracking works with the same email.</p>
            </>
          ) : (
            <>
              <p>We sent a 6-digit code to your email. Enter it below to finish signing in.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input required inputMode="numeric" placeholder="6-digit code" maxLength={6} />
                <button className="btn primary full" type="submit">Sign In</button>
              </form>
              <button className="login-back" onClick={() => setStage("email")}>Use a different email</button>
            </>
          )}
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
