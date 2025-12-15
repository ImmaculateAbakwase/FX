export type SettingsPageType = 'home' | 'form' | 'list' | 'matrix' | 'logs' | 'status' | 'builder'

export type SettingsFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'password'
  | 'file'
  | 'multicheck'

export interface SettingsSelectOption {
  label: string
  value: string
}

export interface SettingsField {
  key: string
  label: string
  type: SettingsFieldType
  placeholder?: string
  hint?: string
  required?: boolean
  min?: number
  max?: number
  step?: number
  options?: SettingsSelectOption[]
  accept?: string
  rows?: number
  items?: SettingsSelectOption[]
}

export interface SettingsSection {
  title: string
  description?: string
  fields: SettingsField[]
}

export interface SettingsListColumn {
  key: string
  label: string
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'password'
  options?: SettingsSelectOption[]
  placeholder?: string
}

export interface SettingsListSchema {
  itemKey: string
  columns: SettingsListColumn[]
  addLabel: string
}

export interface SettingsMatrixSchema {
  rowKey: string
  colKey: string
  rows: { id: string; label: string }[]
  cols: { id: string; label: string }[]
}

export interface SettingsLogsSchema {
  columns: { key: string; label: string }[]
}

export interface SettingsPageSchema {
  key: string
  path: string
  title: string
  subtitle: string
  icon: string
  type: Exclude<SettingsPageType, 'home'>
  sections?: SettingsSection[]
  list?: SettingsListSchema
  matrix?: SettingsMatrixSchema
  logs?: SettingsLogsSchema
}

export interface SettingsCategorySchema {
  key: string
  title: string
  icon: string
  pages: SettingsPageSchema[]
}

export const settingsCategories: SettingsCategorySchema[] = [
  {
    key: 'platform',
    title: 'Platform Settings',
    icon: 'bi-sliders',
    pages: [
      {
        key: 'platform_branding_logo',
        path: '/admin/settings/platform/branding/logo',
        title: 'Logo & Favicon',
        subtitle: 'Upload platform identity assets for apps, web, and dashboards.',
        icon: 'bi-image',
        type: 'form',
        sections: [
          {
            title: 'Brand Assets',
            fields: [
              {
                key: 'logo',
                label: 'Primary Logo',
                type: 'file',
                accept: 'image/*'
              },
              {
                key: 'favicon',
                label: 'Favicon',
                type: 'file',
                accept: 'image/*'
              }
            ]
          }
        ]
      },
      {
        key: 'platform_branding_theme',
        path: '/admin/settings/platform/branding/theme',
        title: 'Color Theme',
        subtitle: 'Manage global brand colors used across KFLIX.',
        icon: 'bi-palette',
        type: 'form',
        sections: [
          {
            title: 'Theme Colors',
            fields: [
              { key: 'primaryColor', label: 'Primary Color', type: 'text', placeholder: '#FF3D3D' },
              { key: 'secondaryColor', label: 'Secondary Color', type: 'text', placeholder: '#2196F3' },
              { key: 'accentColor', label: 'Accent Color', type: 'text', placeholder: '#00BCD4' }
            ]
          }
        ]
      },
      {
        key: 'platform_branding_splash',
        path: '/admin/settings/platform/branding/splash',
        title: 'Splash Screens',
        subtitle: 'Upload splash assets for mobile and TV experiences.',
        icon: 'bi-phone',
        type: 'list',
        list: {
          itemKey: 'screens',
          addLabel: 'Add Splash Screen',
          columns: [
            { key: 'label', label: 'Label', type: 'text', placeholder: 'Android 1080x1920' },
            { key: 'image', label: 'Image (Base64)', type: 'text', placeholder: 'Upload below' }
          ]
        }
      },
      {
        key: 'platform_localization_languages',
        path: '/admin/settings/platform/localization/languages',
        title: 'Language Manager',
        subtitle: 'Enable or disable supported languages for the platform.',
        icon: 'bi-translate',
        type: 'list',
        list: {
          itemKey: 'languages',
          addLabel: 'Add Language',
          columns: [
            { key: 'code', label: 'Code', type: 'text', placeholder: 'en' },
            { key: 'name', label: 'Name', type: 'text', placeholder: 'English' },
            { key: 'enabled', label: 'Enabled', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'platform_localization_translations',
        path: '/admin/settings/platform/localization/translations',
        title: 'Translation Editor',
        subtitle: 'Edit phrases per language (buttons, menus, labels).',
        icon: 'bi-pencil-square',
        type: 'builder',
        sections: [
          {
            title: 'Editor',
            fields: [
              {
                key: 'activeLanguage',
                label: 'Language',
                type: 'select',
                options: [
                  { label: 'English (en)', value: 'en' },
                  { label: 'Swahili (sw)', value: 'sw' },
                  { label: 'French (fr)', value: 'fr' }
                ]
              },
              { key: 'search', label: 'Search', type: 'text', placeholder: 'Search keys or values...' }
            ]
          }
        ]
      },
      {
        key: 'platform_legal_terms',
        path: '/admin/settings/platform/legal/terms',
        title: 'Terms & Conditions',
        subtitle: 'Edit the Terms displayed to users in-app.',
        icon: 'bi-file-earmark-text',
        type: 'form',
        sections: [
          {
            title: 'Document',
            fields: [
              { key: 'content', label: 'Terms Content', type: 'textarea', rows: 14, placeholder: 'Enter terms and conditions...' }
            ]
          }
        ]
      },
      {
        key: 'platform_legal_privacy',
        path: '/admin/settings/platform/legal/privacy',
        title: 'Privacy Policy',
        subtitle: 'Edit the Privacy Policy displayed to users in-app.',
        icon: 'bi-shield-check',
        type: 'form',
        sections: [
          {
            title: 'Document',
            fields: [
              { key: 'content', label: 'Privacy Policy Content', type: 'textarea', rows: 14, placeholder: 'Enter privacy policy...' }
            ]
          }
        ]
      },
      {
        key: 'platform_parental_age_categories',
        path: '/admin/settings/platform/parental/age-categories',
        title: 'Age Categories',
        subtitle: 'Define age ratings used across movies, shows, and games.',
        icon: 'bi-person-bounding-box',
        type: 'list',
        list: {
          itemKey: 'categories',
          addLabel: 'Add Category',
          columns: [
            { key: 'label', label: 'Label', type: 'text', placeholder: '18+' },
            { key: 'minAge', label: 'Min Age', type: 'number', placeholder: '18' },
            { key: 'requiresPin', label: 'Requires PIN', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'platform_parental_pin',
        path: '/admin/settings/platform/parental/pin',
        title: 'Parental PIN Settings',
        subtitle: 'Control platform-wide parental lock behavior.',
        icon: 'bi-key',
        type: 'form',
        sections: [
          {
            title: 'PIN Rules',
            fields: [
              { key: 'pinLength', label: 'PIN Length', type: 'number', min: 4, max: 8, step: 1 },
              { key: 'lockOnRestricted', label: 'Require PIN for restricted content', type: 'checkbox' },
              { key: 'lockOnProfileSwitch', label: 'Require PIN when switching profiles', type: 'checkbox' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'streaming',
    title: 'Streaming Settings',
    icon: 'bi-play-btn',
    pages: [
      {
        key: 'streaming_playback_quality',
        path: '/admin/settings/streaming/playback/quality',
        title: 'Streaming Quality',
        subtitle: 'Set default playback rules for each subscription tier.',
        icon: 'bi-badge-hd',
        type: 'form',
        sections: [
          {
            title: 'Defaults',
            fields: [
              {
                key: 'freeMaxQuality',
                label: 'Free Tier Max Quality',
                type: 'select',
                options: [
                  { label: '480p', value: '480p' },
                  { label: '720p', value: '720p' },
                  { label: '1080p', value: '1080p' }
                ]
              },
              {
                key: 'premiumMaxQuality',
                label: 'Premium Tier Max Quality',
                type: 'select',
                options: [
                  { label: '1080p', value: '1080p' },
                  { label: '1440p', value: '1440p' },
                  { label: '4K', value: '4k' }
                ]
              },
              { key: 'adaptiveBitrate', label: 'Enable Adaptive Bitrate', type: 'checkbox' }
            ]
          }
        ]
      },
      {
        key: 'streaming_playback_subtitles',
        path: '/admin/settings/streaming/playback/subtitles',
        title: 'Subtitle Settings',
        subtitle: 'Configure subtitle defaults and availability.',
        icon: 'bi-badge-cc',
        type: 'form',
        sections: [
          {
            title: 'Defaults',
            fields: [
              { key: 'enabledByDefault', label: 'Enable subtitles by default', type: 'checkbox' },
              { key: 'defaultLanguage', label: 'Default subtitle language', type: 'select', options: [
                { label: 'Auto', value: 'auto' },
                { label: 'English', value: 'en' },
                { label: 'Swahili', value: 'sw' },
                { label: 'French', value: 'fr' }
              ] }
            ]
          }
        ]
      },
      {
        key: 'streaming_mux_keys',
        path: '/admin/settings/streaming/mux/api-keys',
        title: 'MUX API Keys',
        subtitle: 'Connect Mux for video processing and streaming.',
        icon: 'bi-key-fill',
        type: 'form',
        sections: [
          {
            title: 'Credentials',
            fields: [
              { key: 'tokenId', label: 'Mux Token ID', type: 'text', placeholder: 'MUX_TOKEN_ID' },
              { key: 'tokenSecret', label: 'Mux Token Secret', type: 'password', placeholder: 'MUX_TOKEN_SECRET' },
              { key: 'signingSecret', label: 'Webhook Signing Secret', type: 'password', placeholder: 'MUX_WEBHOOK_SECRET' }
            ]
          }
        ]
      },
      {
        key: 'streaming_mux_webhooks',
        path: '/admin/settings/streaming/mux/webhook-status',
        title: 'Webhook Status',
        subtitle: 'Monitor webhook delivery and event health.',
        icon: 'bi-broadcast',
        type: 'status',
        logs: {
          columns: [
            { key: 'event', label: 'Event' },
            { key: 'status', label: 'Status' },
            { key: 'lastSeen', label: 'Last Seen' }
          ]
        }
      },
      {
        key: 'streaming_upload_limits',
        path: '/admin/settings/streaming/uploads/file-size-limits',
        title: 'File Size Limits',
        subtitle: 'Restrict upload sizes to protect servers and storage.',
        icon: 'bi-hdd',
        type: 'form',
        sections: [
          {
            title: 'Limits',
            fields: [
              { key: 'maxVideoGB', label: 'Max video upload (GB)', type: 'number', min: 1, max: 20, step: 0.5 },
              { key: 'maxTrailerGB', label: 'Max trailer upload (GB)', type: 'number', min: 0.1, max: 5, step: 0.1 },
              { key: 'maxSubtitleMB', label: 'Max subtitle file (MB)', type: 'number', min: 1, max: 100, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'streaming_upload_formats',
        path: '/admin/settings/streaming/uploads/allowed-formats',
        title: 'Allowed Formats',
        subtitle: 'Control which file formats can be uploaded.',
        icon: 'bi-file-earmark-code',
        type: 'form',
        sections: [
          {
            title: 'Formats',
            fields: [
              {
                key: 'videoFormats',
                label: 'Video Formats',
                type: 'multicheck',
                items: [
                  { label: 'MP4', value: 'mp4' },
                  { label: 'MOV', value: 'mov' },
                  { label: 'MKV', value: 'mkv' },
                  { label: 'WebM', value: 'webm' }
                ]
              },
              {
                key: 'subtitleFormats',
                label: 'Subtitle Formats',
                type: 'multicheck',
                items: [
                  { label: 'SRT', value: 'srt' },
                  { label: 'VTT', value: 'vtt' },
                  { label: 'ASS', value: 'ass' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'music',
    title: 'Music Settings',
    icon: 'bi-music-note-beamed',
    pages: [
      {
        key: 'music_spotify_credentials',
        path: '/admin/settings/music/spotify/credentials',
        title: 'Spotify Credentials',
        subtitle: 'Connect Spotify APIs to power KFLIX Music features.',
        icon: 'bi-spotify',
        type: 'form',
        sections: [
          {
            title: 'Credentials',
            fields: [
              { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'SPOTIFY_CLIENT_ID' },
              { key: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'SPOTIFY_CLIENT_SECRET' },
              { key: 'redirectUri', label: 'Redirect URI', type: 'text', placeholder: 'https://yourdomain.com/callback' }
            ]
          }
        ]
      },
      {
        key: 'music_spotify_playback',
        path: '/admin/settings/music/spotify/playback-controls',
        title: 'Playback Controls',
        subtitle: 'Define global playback behavior for music experiences.',
        icon: 'bi-sliders2',
        type: 'form',
        sections: [
          {
            title: 'Controls',
            fields: [
              { key: 'allowExplicit', label: 'Allow explicit tracks', type: 'checkbox' },
              { key: 'defaultVolume', label: 'Default room volume (%)', type: 'number', min: 0, max: 100, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'music_rooms_limits',
        path: '/admin/settings/music/rooms/room-limits',
        title: 'Room Limits',
        subtitle: 'Limit participants and behavior for listening rooms.',
        icon: 'bi-people',
        type: 'form',
        sections: [
          {
            title: 'Limits',
            fields: [
              { key: 'maxParticipants', label: 'Max participants per room', type: 'number', min: 2, max: 500, step: 1 },
              { key: 'maxRoomsPerUser', label: 'Max rooms a user can create', type: 'number', min: 1, max: 50, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'music_rooms_reactions',
        path: '/admin/settings/music/rooms/reaction-controls',
        title: 'Reaction Controls',
        subtitle: 'Configure emoji/reactions used in rooms.',
        icon: 'bi-emoji-smile',
        type: 'form',
        sections: [
          {
            title: 'Reactions',
            fields: [
              { key: 'enableReactions', label: 'Enable reactions', type: 'checkbox' },
              { key: 'cooldownSeconds', label: 'Reaction cooldown (seconds)', type: 'number', min: 0, max: 30, step: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'gaming',
    title: 'Gaming Settings',
    icon: 'bi-controller',
    pages: [
      {
        key: 'gaming_upload_types',
        path: '/admin/settings/gaming/uploads/allowed-file-types',
        title: 'Allowed File Types',
        subtitle: 'Restrict what developers can upload for games.',
        icon: 'bi-filetype-html',
        type: 'form',
        sections: [
          {
            title: 'Types',
            fields: [
              { key: 'allowHtml5', label: 'Allow HTML5 games', type: 'checkbox' },
              { key: 'allowExe', label: 'Allow .exe uploads (not recommended)', type: 'checkbox' }
            ]
          }
        ]
      },
      {
        key: 'gaming_upload_size',
        path: '/admin/settings/gaming/uploads/game-size-limits',
        title: 'Game Size Limits',
        subtitle: 'Prevent large uploads that degrade performance.',
        icon: 'bi-box',
        type: 'form',
        sections: [
          {
            title: 'Limits',
            fields: [
              { key: 'maxGameMB', label: 'Max game size (MB)', type: 'number', min: 10, max: 5000, step: 10 }
            ]
          }
        ]
      },
      {
        key: 'gaming_xp_settings',
        path: '/admin/settings/gaming/xp/xp-settings',
        title: 'XP Settings',
        subtitle: 'Define how users earn XP in games.',
        icon: 'bi-lightning',
        type: 'form',
        sections: [
          {
            title: 'XP Rules',
            fields: [
              { key: 'xpPerWin', label: 'XP per win', type: 'number', min: 0, max: 1000, step: 1 },
              { key: 'xpPerLoss', label: 'XP per loss', type: 'number', min: 0, max: 1000, step: 1 },
              { key: 'dailyBonusXp', label: 'Daily bonus XP', type: 'number', min: 0, max: 5000, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'gaming_rewards_rules',
        path: '/admin/settings/gaming/xp/rewards-rules',
        title: 'Rewards Rules',
        subtitle: 'Manage coins, streaks, and reward logic.',
        icon: 'bi-gift',
        type: 'form',
        sections: [
          {
            title: 'Rewards',
            fields: [
              { key: 'coinsPerDay', label: 'Coins per day', type: 'number', min: 0, max: 100000, step: 1 },
              { key: 'coinsPerWin', label: 'Coins per win', type: 'number', min: 0, max: 100000, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'gaming_multiplayer_room',
        path: '/admin/settings/gaming/multiplayer/max-room-size',
        title: 'Max Room Size',
        subtitle: 'Control maximum players per multiplayer room.',
        icon: 'bi-people-fill',
        type: 'form',
        sections: [
          {
            title: 'Rooms',
            fields: [
              { key: 'maxPlayers', label: 'Max players per room', type: 'number', min: 2, max: 100, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'gaming_multiplayer_timeout',
        path: '/admin/settings/gaming/multiplayer/timeout-controls',
        title: 'Timeout Controls',
        subtitle: 'Handle inactivity and sync safety for multiplayer sessions.',
        icon: 'bi-hourglass-split',
        type: 'form',
        sections: [
          {
            title: 'Timeouts',
            fields: [
              { key: 'inactiveKickMinutes', label: 'Auto-kick after (minutes)', type: 'number', min: 1, max: 60, step: 1 },
              { key: 'reconnectGraceSeconds', label: 'Reconnect grace (seconds)', type: 'number', min: 0, max: 300, step: 5 }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'payments',
    title: 'Payments & Commerce',
    icon: 'bi-credit-card',
    pages: [
      {
        key: 'payments_gateways_keys',
        path: '/admin/settings/payments/gateways/gateway-keys',
        title: 'Gateway Keys',
        subtitle: 'Store payment provider credentials (Stripe, Mobile Money, etc.).',
        icon: 'bi-key',
        type: 'list',
        list: {
          itemKey: 'gateways',
          addLabel: 'Add Gateway',
          columns: [
            { key: 'provider', label: 'Provider', type: 'select', options: [
              { label: 'Stripe', value: 'stripe' },
              { label: 'Flutterwave', value: 'flutterwave' },
              { label: 'PayPal', value: 'paypal' },
              { label: 'Mobile Money', value: 'momo' }
            ] },
            { key: 'publicKey', label: 'Public Key', type: 'text' },
            { key: 'secretKey', label: 'Secret Key', type: 'password' },
            { key: 'enabled', label: 'Enabled', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'payments_gateways_logs',
        path: '/admin/settings/payments/gateways/webhook-logs',
        title: 'Webhook Logs',
        subtitle: 'Review payment webhook deliveries and errors.',
        icon: 'bi-journal-text',
        type: 'logs',
        logs: {
          columns: [
            { key: 'provider', label: 'Provider' },
            { key: 'event', label: 'Event' },
            { key: 'status', label: 'Status' },
            { key: 'timestamp', label: 'Timestamp' }
          ]
        }
      },
      {
        key: 'payments_plans_manager',
        path: '/admin/settings/payments/plans/plan-manager',
        title: 'Plan Manager',
        subtitle: 'Create and manage subscription tiers.',
        icon: 'bi-tags',
        type: 'list',
        list: {
          itemKey: 'plans',
          addLabel: 'Add Plan',
          columns: [
            { key: 'name', label: 'Name', type: 'text', placeholder: 'Premium' },
            { key: 'price', label: 'Price', type: 'number', placeholder: '18000' },
            { key: 'currency', label: 'Currency', type: 'select', options: [
              { label: 'UGX', value: 'UGX' },
              { label: 'USD', value: 'USD' }
            ] },
            { key: 'maxDevices', label: 'Max Devices', type: 'number', placeholder: '4' },
            { key: 'maxQuality', label: 'Max Quality', type: 'select', options: [
              { label: '720p', value: '720p' },
              { label: '1080p', value: '1080p' },
              { label: '4K', value: '4k' }
            ] },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'payments_plans_matrix',
        path: '/admin/settings/payments/plans/features-matrix',
        title: 'Features Matrix',
        subtitle: 'Control which features each plan includes.',
        icon: 'bi-grid-3x3-gap',
        type: 'matrix',
        matrix: {
          rowKey: 'feature',
          colKey: 'plan',
          rows: [
            { id: 'devices', label: 'Multiple Devices' },
            { id: 'offline', label: 'Offline Downloads' },
            { id: '4k', label: '4K Playback' },
            { id: 'no_ads', label: 'No Ads' }
          ],
          cols: [
            { id: 'free', label: 'Free' },
            { id: 'standard', label: 'Standard' },
            { id: 'premium', label: 'Premium' }
          ]
        }
      },
      {
        key: 'payments_tax_rules',
        path: '/admin/settings/payments/tax/tax-rules',
        title: 'Tax Rules',
        subtitle: 'Configure VAT/Tax rules applied to transactions.',
        icon: 'bi-receipt',
        type: 'form',
        sections: [
          {
            title: 'Tax',
            fields: [
              { key: 'vatEnabled', label: 'Enable VAT', type: 'checkbox' },
              { key: 'vatPercent', label: 'VAT Percentage', type: 'number', min: 0, max: 50, step: 0.1 },
              { key: 'vatCountry', label: 'Country', type: 'text', placeholder: 'Uganda' }
            ]
          }
        ]
      },
      {
        key: 'payments_invoice_branding',
        path: '/admin/settings/payments/tax/invoice-branding',
        title: 'Invoice Branding',
        subtitle: 'Set branding used on invoices and receipts.',
        icon: 'bi-file-earmark-richtext',
        type: 'form',
        sections: [
          {
            title: 'Branding',
            fields: [
              { key: 'companyName', label: 'Company Name', type: 'text' },
              { key: 'companyAddress', label: 'Company Address', type: 'textarea', rows: 4 },
              { key: 'logo', label: 'Invoice Logo', type: 'file', accept: 'image/*' }
            ]
          }
        ]
      },
      {
        key: 'payments_ppv_pricing',
        path: '/admin/settings/payments/ppv/ppv-pricing-rules',
        title: 'PPV Pricing Rules',
        subtitle: 'Define default pricing rules for PPV content.',
        icon: 'bi-ticket-perforated',
        type: 'form',
        sections: [
          {
            title: 'Pricing',
            fields: [
              { key: 'defaultCurrency', label: 'Default Currency', type: 'select', options: [
                { label: 'UGX', value: 'UGX' },
                { label: 'USD', value: 'USD' }
              ] },
              { key: 'minPrice', label: 'Minimum Price', type: 'number', min: 0, max: 100000000, step: 1 },
              { key: 'maxPrice', label: 'Maximum Price', type: 'number', min: 0, max: 100000000, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'payments_ppv_bundles',
        path: '/admin/settings/payments/ppv/bundle-builder',
        title: 'Bundle Builder',
        subtitle: 'Create special bundles for PPV and promotions.',
        icon: 'bi-box-seam',
        type: 'builder',
        sections: [
          {
            title: 'Bundle',
            fields: [
              { key: 'bundleName', label: 'Bundle Name', type: 'text', placeholder: 'Live Concert + Exclusive Trailer' },
              { key: 'price', label: 'Bundle Price', type: 'number', min: 0, max: 100000000, step: 1 },
              { key: 'currency', label: 'Currency', type: 'select', options: [
                { label: 'UGX', value: 'UGX' },
                { label: 'USD', value: 'USD' }
              ] }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'notifications',
    title: 'Notifications & Communication',
    icon: 'bi-bell',
    pages: [
      {
        key: 'notifications_templates_email',
        path: '/admin/settings/notifications/templates/email-editor',
        title: 'Email Editor',
        subtitle: 'Design email templates with variables and previews.',
        icon: 'bi-envelope',
        type: 'builder',
        sections: [
          {
            title: 'Template',
            fields: [
              { key: 'subject', label: 'Subject', type: 'text', placeholder: 'New Episode Released: {{title}}' },
              { key: 'body', label: 'Body', type: 'textarea', rows: 12, placeholder: 'Hello {{user_name}}, ...' }
            ]
          }
        ]
      },
      {
        key: 'notifications_templates_push',
        path: '/admin/settings/notifications/templates/push-editor',
        title: 'Push Notification Editor',
        subtitle: 'Compose push templates used by trigger automations.',
        icon: 'bi-phone-vibrate',
        type: 'builder',
        sections: [
          {
            title: 'Template',
            fields: [
              { key: 'title', label: 'Title', type: 'text', placeholder: 'New content available!' },
              { key: 'message', label: 'Message', type: 'textarea', rows: 8, placeholder: 'Watch now: {{content_title}}' }
            ]
          }
        ]
      },
      {
        key: 'notifications_triggers_events',
        path: '/admin/settings/notifications/triggers/event-triggers',
        title: 'Event Triggers',
        subtitle: 'Automate notifications for system events.',
        icon: 'bi-lightning-charge',
        type: 'list',
        list: {
          itemKey: 'eventTriggers',
          addLabel: 'Add Event Trigger',
          columns: [
            { key: 'event', label: 'Event', type: 'select', options: [
              { label: 'New Episode Released', value: 'new_episode' },
              { label: 'Subscription Renewed', value: 'sub_renewed' },
              { label: 'Payment Failed', value: 'payment_failed' }
            ] },
            { key: 'channel', label: 'Channel', type: 'select', options: [
              { label: 'Push', value: 'push' },
              { label: 'Email', value: 'email' }
            ] },
            { key: 'enabled', label: 'Enabled', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'notifications_triggers_behavior',
        path: '/admin/settings/notifications/triggers/user-behavior-triggers',
        title: 'User Behavior Triggers',
        subtitle: 'Re-engage users based on activity patterns.',
        icon: 'bi-graph-up',
        type: 'list',
        list: {
          itemKey: 'behaviorTriggers',
          addLabel: 'Add Behavior Trigger',
          columns: [
            { key: 'rule', label: 'Rule', type: 'select', options: [
              { label: 'Inactive for 7 days', value: 'inactive_7' },
              { label: 'Abandoned checkout', value: 'abandoned_checkout' }
            ] },
            { key: 'channel', label: 'Channel', type: 'select', options: [
              { label: 'Push', value: 'push' },
              { label: 'Email', value: 'email' }
            ] },
            { key: 'enabled', label: 'Enabled', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'notifications_announcements_maintenance',
        path: '/admin/settings/notifications/announcements/maintenance-alerts',
        title: 'Maintenance Alerts',
        subtitle: 'Display scheduled maintenance banners to all users.',
        icon: 'bi-tools',
        type: 'list',
        list: {
          itemKey: 'maintenanceAlerts',
          addLabel: 'Add Maintenance Alert',
          columns: [
            { key: 'message', label: 'Message', type: 'text', placeholder: 'Maintenance from 1AM–3AM' },
            { key: 'startsAt', label: 'Starts At', type: 'text', placeholder: '2025-12-15 01:00' },
            { key: 'endsAt', label: 'Ends At', type: 'text', placeholder: '2025-12-15 03:00' },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'notifications_announcements_emergency',
        path: '/admin/settings/notifications/announcements/emergency-notices',
        title: 'Emergency Notices',
        subtitle: 'Send urgent global banners (outages, security notices).',
        icon: 'bi-exclamation-triangle',
        type: 'list',
        list: {
          itemKey: 'emergencyNotices',
          addLabel: 'Add Emergency Notice',
          columns: [
            { key: 'message', label: 'Message', type: 'text', placeholder: 'Service outage in progress' },
            { key: 'severity', label: 'Severity', type: 'select', options: [
              { label: 'Info', value: 'info' },
              { label: 'Warning', value: 'warning' },
              { label: 'Critical', value: 'critical' }
            ] },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      }
    ]
  },
  {
    key: 'security',
    title: 'Security & Access',
    icon: 'bi-shield-lock',
    pages: [
      {
        key: 'security_roles_manager',
        path: '/admin/settings/security/roles/role-manager',
        title: 'Role Manager',
        subtitle: 'Create and manage admin roles.',
        icon: 'bi-person-badge',
        type: 'list',
        list: {
          itemKey: 'roles',
          addLabel: 'Add Role',
          columns: [
            { key: 'name', label: 'Role Name', type: 'text', placeholder: 'Support Agent' },
            { key: 'description', label: 'Description', type: 'text', placeholder: 'Can view reports and tickets' },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'security_roles_matrix',
        path: '/admin/settings/security/roles/permission-matrix',
        title: 'Permission Matrix',
        subtitle: 'Control permissions for each role.',
        icon: 'bi-grid',
        type: 'matrix',
        matrix: {
          rowKey: 'permission',
          colKey: 'role',
          rows: [
            { id: 'videos_view', label: 'View Videos' },
            { id: 'videos_delete', label: 'Delete Videos' },
            { id: 'users_view', label: 'View Users' },
            { id: 'users_manage', label: 'Manage Users' },
            { id: 'settings_manage', label: 'Manage Settings' }
          ],
          cols: [
            { id: 'super_admin', label: 'Super Admin' },
            { id: 'admin', label: 'Admin' },
            { id: 'support', label: 'Support' }
          ]
        }
      },
      {
        key: 'security_ip_whitelist',
        path: '/admin/settings/security/ip/ip-whitelist',
        title: 'IP Whitelist',
        subtitle: 'Allow admin access only from specific IPs.',
        icon: 'bi-check-circle',
        type: 'list',
        list: {
          itemKey: 'whitelist',
          addLabel: 'Add IP',
          columns: [
            { key: 'ip', label: 'IP Address', type: 'text', placeholder: '203.0.113.10' },
            { key: 'note', label: 'Note', type: 'text', placeholder: 'Office network' },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'security_ip_blacklist',
        path: '/admin/settings/security/ip/ip-blacklist',
        title: 'IP Blacklist',
        subtitle: 'Block known malicious IPs from accessing admin.',
        icon: 'bi-x-circle',
        type: 'list',
        list: {
          itemKey: 'blacklist',
          addLabel: 'Add IP',
          columns: [
            { key: 'ip', label: 'IP Address', type: 'text', placeholder: '198.51.100.5' },
            { key: 'reason', label: 'Reason', type: 'text', placeholder: 'Brute force attempts' },
            { key: 'active', label: 'Active', type: 'checkbox' }
          ]
        }
      },
      {
        key: 'security_rate_login',
        path: '/admin/settings/security/rate-limiting/login-limits',
        title: 'Login Limits',
        subtitle: 'Prevent brute-force attacks on admin/user logins.',
        icon: 'bi-speedometer',
        type: 'form',
        sections: [
          {
            title: 'Limits',
            fields: [
              { key: 'maxAttempts', label: 'Max failed attempts', type: 'number', min: 1, max: 50, step: 1 },
              { key: 'lockMinutes', label: 'Lockout duration (minutes)', type: 'number', min: 1, max: 1440, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'security_rate_otp',
        path: '/admin/settings/security/rate-limiting/otp-limits',
        title: 'OTP Limits',
        subtitle: 'Rate-limit OTP generation and verification.',
        icon: 'bi-shield',
        type: 'form',
        sections: [
          {
            title: 'Limits',
            fields: [
              { key: 'maxOtpPerHour', label: 'Max OTP requests per hour', type: 'number', min: 1, max: 100, step: 1 },
              { key: 'otpExpiryMinutes', label: 'OTP expiry (minutes)', type: 'number', min: 1, max: 60, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'security_privacy_export',
        path: '/admin/settings/security/privacy/export-data-requests',
        title: 'Export Data Requests',
        subtitle: 'Manage user requests to export personal data.',
        icon: 'bi-download',
        type: 'logs',
        logs: {
          columns: [
            { key: 'user', label: 'User' },
            { key: 'requestedAt', label: 'Requested At' },
            { key: 'status', label: 'Status' }
          ]
        }
      },
      {
        key: 'security_privacy_delete',
        path: '/admin/settings/security/privacy/delete-my-account',
        title: 'Delete My Account',
        subtitle: 'Approve or reject account deletion requests.',
        icon: 'bi-trash',
        type: 'logs',
        logs: {
          columns: [
            { key: 'user', label: 'User' },
            { key: 'requestedAt', label: 'Requested At' },
            { key: 'status', label: 'Status' }
          ]
        }
      },
      {
        key: 'security_backups_scheduler',
        path: '/admin/settings/security/backups/backup-scheduler',
        title: 'Backup Scheduler',
        subtitle: 'Schedule automated backups for database and storage.',
        icon: 'bi-calendar2-check',
        type: 'form',
        sections: [
          {
            title: 'Schedule',
            fields: [
              { key: 'enabled', label: 'Enable scheduled backups', type: 'checkbox' },
              { key: 'frequency', label: 'Frequency', type: 'select', options: [
                { label: 'Every 24 hours', value: '24h' },
                { label: 'Every 12 hours', value: '12h' },
                { label: 'Weekly', value: 'weekly' }
              ] },
              { key: 'retainCount', label: 'Retain last N backups', type: 'number', min: 1, max: 365, step: 1 }
            ]
          }
        ]
      },
      {
        key: 'security_backups_restore_points',
        path: '/admin/settings/security/backups/restore-point-manager',
        title: 'Restore Point Manager',
        subtitle: 'View and manage restore points.',
        icon: 'bi-arrow-counterclockwise',
        type: 'logs',
        logs: {
          columns: [
            { key: 'name', label: 'Name' },
            { key: 'createdAt', label: 'Created At' },
            { key: 'status', label: 'Status' }
          ]
        }
      }
    ]
  }
]

export const settingsPages: SettingsPageSchema[] = settingsCategories.flatMap((c) => c.pages)

export const settingsPagesByKey = settingsPages.reduce<Record<string, SettingsPageSchema>>((acc, page) => {
  acc[page.key] = page
  return acc
}, {})
