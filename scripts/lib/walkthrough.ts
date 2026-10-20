/** A static teaching example, not evidence of an integrated automation. */
export function renderWalkthrough(): string {
  return `<section id="workflow-walkthrough" class="section-colorway-white pv-large cm-walkthrough">
    <div class="section section--large"><div class="section__inner content">
      <p class="subtitle">See the work, step by step</p>
      <h2>One enquiry. A clearer next step.</h2>
      <p class="cm-section-lead">Instead of copying a message between tools, a possible workflow prepares the record and next action. Your team stays responsible for the reply.</p>
      <p class="cm-sample-label">Made-up sample details (synthetic data) · not connected to an inbox or CRM</p>
      <details class="cm-sample" open>
        <summary>Follow a sample enquiry</summary>
        <ol class="cm-sample-grid">
          <li><span class="cm-step-label">01 / Incoming message</span><h3>A customer asks for help</h3><blockquote>“I need a quote for a maintenance visit next week. Please send the next steps.”</blockquote><p>Sample context: a permitted reply address and service area are available.</p></li>
          <li><span class="cm-step-label">02 / Prepared record</span><h3>The details have a place</h3><dl><div><dt>Request</dt><dd>Maintenance visit</dd></div><div><dt>Timing</dt><dd>Next week; not confirmed</dd></div><div><dt>Next action</dt><dd>Review enquiry and assign an owner</dd></div></dl><p>No appointment or price is promised.</p></li>
          <li><span class="cm-step-label">03 / Human checkpoint</span><h3>A person approves the reply</h3><blockquote>“Thanks for your enquiry. A team member will review the details and confirm the next steps.”</blockquote><p>Illustrative draft only. Your team checks availability, advice, and commitments before sending.</p></li>
        </ol>
      </details>
      <details class="cm-sample">
        <summary>What if the details are missing?</summary>
        <div class="cm-exception"><div><span class="cm-step-label">Exception / Human review</span><h3>Pause instead of guessing.</h3><p>Sample message: “Can you help? Call me.” No callback number, reply channel, or clear request is available.</p></div><div><h3>Keep the incomplete enquiry visible.</h3><p>A possible workflow flags the missing information and routes the message to a person. It does not invent contact details, send an unsupported answer, or mark the request as resolved.</p></div></div>
      </details>
      <div class="cm-responsibilities"><div><h3>What the workflow could prepare</h3><p>Capture the message, organize agreed fields, flag gaps, and prepare the next action.</p></div><div><h3>What your team still decides</h3><p>Approve sensitive replies, confirm commitments, and handle unusual requests.</p></div></div>
      <p class="cm-disclosure">This explains a possible approach, not a working integration or a completed client project. Tool access, routing, duplicate handling, and approval rules must be agreed and tested for a real pilot.</p>
      <a class="cm-text-link" href="/examples/#enquiries">Read the enquiry workflow and possible measures</a>
    </div></div>
  </section>`;
}
