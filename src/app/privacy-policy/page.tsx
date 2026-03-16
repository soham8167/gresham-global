const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 font-sans text-gray-900">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Privacy Policy</h1>

      <p className="text-sm sm:text-base mb-8 leading-relaxed">
        Welcome to Gresham Global! We value your privacy and are committed to protecting your
        personal information. This Privacy Policy explains how we collect, use, and safeguard your
        data when you visit our website{" "}
        <a
          href="https://gresham-global.vercel.app/"
          className="text-blue-600 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://gresham-global/
        </a>
        .
      </p>

      <ol className="list-decimal list-outside space-y-8 pl-2 text-sm sm:text-base">
        {/* 1. Information We Collect */}
        <li>
          <span className="font-bold">Information We Collect</span>
          <ol className="list-decimal list-outside mt-2 space-y-2 pl-2">
            <li>
              <span className="font-extrabold">Personal Information:</span> We may collect personal
              information you provide directly, such as your name, email address, phone number, and
              other contact details when you fill out forms, subscribe to our newsletter, or contact
              us.
            </li>
            <li>
                
              <span className="font-bold">Usage Data:</span> We automatically collect information
              about your visit to our Site, including your IP address, browser type, operating
              system, pages visited, and the dates/times of your visits.
            </li>
            <li>
              <span className="font-bold">Cookies and Tracking Technologies:</span> We use cookies
              and similar tracking technologies to enhance your experience on our Site. Cookies are
              small data files stored on your device that help us remember your preferences and track
              usage patterns. You can control cookie settings through your browser, but disabling
              cookies may affect the functionality of our Site.
            </li>
          </ol>
        </li>

        {/* 2. How We Use Your Information */}
        <li>
          <span className="font-bold">How We Use Your Information</span>
          <ul className="list-none mt-2 space-y-1 pl-2">
            {[
              "To provide, operate, and maintain our Site",
              "To improve and personalize your experience",
              "To communicate with you, including sending newsletters, updates, and promotional materials",
              "To respond to your inquiries and support requests",
              "To analyze usage trends and enhance our Site's performance",
              "To comply with legal obligations and protect our legal rights",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full border border-gray-600 shrink-0 inline-block" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </li>

        {/* 3. Sharing Your Information */}
        <li>
          <span className="font-bold">Sharing Your Information</span>
          <p className="mt-2 mb-3">
            We do not sell, trade, or otherwise transfer your personal information to outside
            parties, except in the following circumstances:
          </p>
          <ul className="list-none space-y-2 pl-2">
            {[
              {
                label: "Service Providers:",
                text: "We may share your information with third-party service providers who assist us in operating our Site and conducting our business, provided they agree to keep your information confidential.",
              },
              {
                label: "Legal Requirements:",
                text: "We may disclose your information if required by law, regulation, or legal process, or to protect the rights, property, or safety of Gresham Global, our users, or others.",
              },
              {
                label: "Business Transfers:",
                text: "In the event of a merger, acquisition, or other business transition, your information may be transferred as part of the transaction.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full border border-gray-600 shrink-0 inline-block" />
                <span>
                  <span className="font-bold">{item.label}</span> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </li>

        {/* 4. Security */}
        <li>
          <span className="font-bold">Security</span>
          <p className="mt-2">
            We implement reasonable security measures to protect your personal information from
            unauthorized access, disclosure, alteration, and destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure. While we strive to
            protect your information, we cannot guarantee its security.
          </p>
        </li>

        {/* 5. Your Choices */}
        <li>
          <span className="font-bold">Your Choices</span>
          <ul className="list-none mt-2 space-y-2 pl-2">
            {[
              {
                label: "Access and Correction:",
                text: "You may request access to or correction of your personal information held by us.",
              },
              {
                label: "Opt-Out:",
                text: "You may opt out of receiving promotional communications from us by following the unsubscribe instructions included in those communications.",
              },
              {
                label: "Cookies:",
                text: "You can manage your cookie preferences through your browser settings. Note that disabling cookies may affect your experience on our Site.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full border border-gray-600 shrink-0 inline-block" />
                <span>
                  <span className="font-bold">{item.label}</span> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </li>

        {/* 6. Changes to This Privacy Policy */}
        <li>
          <span className="font-bold">Changes to This Privacy Policy</span>
          <p className="mt-2">
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or legal requirements. We will notify you of any significant changes by posting the
            updated policy on our Site with the revised effective date. Your continued use of our
            Site after such changes constitutes your acceptance of the updated policy.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default page;
