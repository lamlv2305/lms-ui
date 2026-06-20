import { Link } from "react-router"

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/login" className="text-sm text-muted-foreground hover:underline">
        &larr; Back to login
      </Link>
      <h1 className="mt-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 20, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold">1. Information We Collect</h2>
          <p className="mt-2 text-muted-foreground">
            We collect information you provide directly, such as your name, email
            address, and role, as well as data generated through your use of the
            service, including courses, assignments, and grades.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">2. How We Use Information</h2>
          <p className="mt-2 text-muted-foreground">
            We use your information to operate the learning management system,
            authenticate access, deliver course content, and improve the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">3. Sharing</h2>
          <p className="mt-2 text-muted-foreground">
            We do not sell your personal information. We share data only with your
            institution, with service providers acting on our behalf, or as required
            by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">4. Data Retention</h2>
          <p className="mt-2 text-muted-foreground">
            We retain your information for as long as your account is active or as
            needed to provide the service and comply with our legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">5. Security</h2>
          <p className="mt-2 text-muted-foreground">
            We use reasonable technical and organizational measures to protect your
            information. No method of transmission or storage is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">6. Your Rights</h2>
          <p className="mt-2 text-muted-foreground">
            Depending on your jurisdiction, you may have the right to access,
            correct, or delete your personal information. Contact your institution
            or us to exercise these rights.
          </p>
        </section>
      </div>
    </div>
  )
}
