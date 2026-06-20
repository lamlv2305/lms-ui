import { Link } from "react-router"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/login" className="text-sm text-muted-foreground hover:underline">
        &larr; Back to login
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 20, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
          <p className="mt-2 text-muted-foreground">
            By accessing or using this learning management system, you agree to be
            bound by these Terms of Service. If you do not agree, do not use the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">2. Accounts</h2>
          <p className="mt-2 text-muted-foreground">
            You are responsible for safeguarding your account credentials and for
            all activity that occurs under your account. Notify us immediately of
            any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
          <p className="mt-2 text-muted-foreground">
            You agree not to misuse the service, including attempting to access it
            using a method other than the interface and instructions we provide, or
            interfering with its normal operation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">4. Content</h2>
          <p className="mt-2 text-muted-foreground">
            Course materials, assignments, and submissions remain the property of
            their respective owners. You grant us a license to host and display such
            content solely to operate the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">5. Termination</h2>
          <p className="mt-2 text-muted-foreground">
            We may suspend or terminate access for conduct that violates these terms
            or is harmful to other users or the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">6. Changes</h2>
          <p className="mt-2 text-muted-foreground">
            We may revise these terms from time to time. Continued use of the service
            after changes take effect constitutes acceptance of the revised terms.
          </p>
        </section>
      </div>
    </div>
  )
}
