import React from 'react';
import { SignatureData } from '../types';

interface SignaturePreviewProps {
  data: SignatureData;
}

export function SignaturePreview({ data }: SignaturePreviewProps) {
  const {
    name,
    title,
    company,
    department,
    email,
    phone,
    mobile,
    website,
    address,
    profilePic,
    logoUrl,
    linkedin,
    twitter,
    facebook,
    instagram,
    youtube,
    themeColor,
    fontFamily,
  } = data;

  const hasSocial = linkedin || twitter || facebook || instagram || youtube;
  const hasImages = profilePic || logoUrl;
  const hasContact = phone || mobile || email || website || address;

  // Social icon placeholders (colored circles with text initials for email compatibility)
  const SocialIcon = ({ url, label, code }: { url: string; label: string; code: string }) => (
    <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block', marginRight: '8px' }}>
      <span style={{
        display: 'inline-block',
        width: '24px',
        height: '24px',
        lineHeight: '24px',
        textAlign: 'center',
        backgroundColor: themeColor,
        color: '#ffffff',
        borderRadius: '50%',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
      }}>
        {code}
      </span>
    </a>
  );

  return (
    <table cellPadding={0} cellSpacing={0} style={{ fontFamily, fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
      <tbody>
        <tr>
          {/* Images Section */}
          {hasImages && (
            <td style={{ paddingRight: '20px', borderRight: `2px solid ${themeColor}`, verticalAlign: 'top' }}>
              {profilePic && (
                <img
                  src={profilePic}
                  alt={name || 'Profile Picture'}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', display: 'block', marginBottom: logoUrl ? '12px' : '0' }}
                />
              )}
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={company || 'Company Logo'}
                  style={{ width: '90px', objectFit: 'contain', display: 'block', marginTop: profilePic ? '12px' : '0' }}
                />
              )}
            </td>
          )}

          {/* Details Section */}
          <td style={{ paddingLeft: hasImages ? '20px' : '0', verticalAlign: 'top' }}>
            {/* Header: Name and Title */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: themeColor }}>
                {name || 'Seu Nome'}
              </div>
              {(title || department || company) && (
                <div style={{ fontSize: '14px', color: '#4B5563', marginTop: '2px' }}>
                  <strong>{title}</strong>
                  {department && ` | ${department}`}
                  {company && (
                    <span>
                      {' | '}
                      <strong>{company}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Contact Details */}
            {hasContact && (
              <table cellPadding={0} cellSpacing={0} style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: '1.6' }}>
                <tbody>
                  {(phone || mobile) && (
                    <tr>
                      <td style={{ paddingRight: '8px', color: themeColor }}><strong>Tel:</strong></td>
                      <td>
                        {phone && <span>{phone}</span>}
                        {phone && mobile && <span> | </span>}
                        {mobile && <span>{mobile}</span>}
                      </td>
                    </tr>
                  )}
                  {email && (
                    <tr>
                      <td style={{ paddingRight: '8px', color: themeColor }}><strong>Email:</strong></td>
                      <td><a href={`mailto:${email}`} style={{ color: '#6B7280', textDecoration: 'none' }}>{email}</a></td>
                    </tr>
                  )}
                  {website && (
                    <tr>
                      <td style={{ paddingRight: '8px', color: themeColor }}><strong>Web:</strong></td>
                      <td><a href={website.startsWith('http') ? website : `https://${website}`} style={{ color: '#6B7280', textDecoration: 'none' }}>{website}</a></td>
                    </tr>
                  )}
                  {address && (
                    <tr>
                      <td style={{ paddingRight: '8px', color: themeColor }}><strong>End:</strong></td>
                      <td>{address}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Social Icons */}
            {hasSocial && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                {linkedin && <SocialIcon url={linkedin} label="LinkedIn" code="in" />}
                {twitter && <SocialIcon url={twitter} label="Twitter" code="tw" />}
                {facebook && <SocialIcon url={facebook} label="Facebook" code="fb" />}
                {instagram && <SocialIcon url={instagram} label="Instagram" code="ig" />}
                {youtube && <SocialIcon url={youtube} label="YouTube" code="yt" />}
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
