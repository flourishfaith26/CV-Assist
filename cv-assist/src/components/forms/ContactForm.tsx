import React from 'react';
import { User, Mail, Phone, MapPin, Link, Globe } from 'lucide-react';
import type { ContactInfo } from '../../types/cv';

interface ContactFormProps {
  contact: ContactInfo;
  onChange: <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ contact, onChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6 transition-colors">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <User className="w-5 h-5 text-olive-700 dark:text-olive-600" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-olive-700 dark:text-olive-600">
          Contact Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              value={contact.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="alex.morgan@email.com"
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Location (City, State / Country)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              id="location"
              type="text"
              value={contact.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            LinkedIn
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Link className="w-4 h-4" />
            </div>
            <input
              id="linkedin"
              type="text"
              value={contact.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="portfolio"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Portfolio / GitHub / Website
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Globe className="w-4 h-4" />
            </div>
            <input
              id="portfolio"
              type="text"
              value={contact.portfolio}
              onChange={(e) => onChange('portfolio', e.target.value)}
              placeholder="alexmorgan.dev"
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
