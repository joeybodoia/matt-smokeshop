import React from 'react';
import { Download, Mail } from 'lucide-react';

const Employment = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Employment Opportunities</h1>
        <p className="text-xl text-gray-600">
          Join our team and be part of something special
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">How to Apply</h2>
        
        <div className="mb-8">
          <a
            href="/employment-application.pdf"
            download
            className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Application Form
          </a>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Application Instructions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Option 1: Email Submission</p>
                  <p className="text-gray-600">
                    Email your completed application to:{' '}
                    <a 
                      href="mailto:SMOKENGOAPP@GMAIL.COM"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      SMOKENGOAPP@GMAIL.COM
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Please include your full name in the subject line followed by "APPLICATION"
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Option 2: In-Person Submission</p>
                  <p className="text-gray-600">
                    Print the application and drop it off at any of our locations during business hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Please fill out the application completely and accurately</li>
              <li>All applicants must be 21 years or older</li>
              <li>Previous retail experience is preferred but not required</li>
              <li>We offer competitive pay and flexible schedules</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employment;
