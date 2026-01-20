import LoginPageGuard from '@/components/LoginPageGuard';

export default function ContactPage() {
  return (
    <LoginPageGuard>
      <div className="flex min-h-screen items-center justify-center bg-saf-color-light font-sans">
         This is the contact page.
      </div>
    </LoginPageGuard>
  );
}
