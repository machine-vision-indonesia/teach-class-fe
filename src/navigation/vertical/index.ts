// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      path: '/dashboards/analytics'
    },
    {
      title: 'Master Shift',
      icon: 'tabler:time',
      path: '/master-shift'
    },

    // REMOVE THESE EXAMPLE ON PRODUCTION
    {
      title: 'EXAMPLES',
      icon: 'tabler:archive',
      badgeContent: '!!!',
      badgeColor: 'error',
      children: [
        {
          title: 'Dashboards',
          icon: 'tabler:smart-home',
          badgeContent: 'new',
          badgeColor: 'error',
          children: [
            {
              title: 'Analytics',
              path: '/___examples/dashboards/analytics'
            },
            {
              title: 'CRM',
              path: '/___examples/dashboards/crm'
            },
            {
              title: 'eCommerce',
              path: '/___examples/dashboards/ecommerce'
            }
          ]
        },
        {
          sectionTitle: 'Apps & Pages'
        },
        {
          title: 'Email',
          icon: 'tabler:mail',
          path: '/___examples/apps/email'
        },
        {
          title: 'Chat',
          icon: 'tabler:messages',
          path: '/___examples/apps/chat'
        },
        {
          title: 'Calendar',
          icon: 'tabler:calendar',
          path: '/___examples/apps/calendar'
        },
        {
          title: 'Invoice',
          icon: 'tabler:file-dollar',
          children: [
            {
              title: 'List',
              path: '/___examples/apps/invoice/list'
            },
            {
              title: 'Preview',
              path: '/___examples/apps/invoice/preview'
            },
            {
              title: 'Edit',
              path: '/___examples/apps/invoice/edit'
            },
            {
              title: 'Add',
              path: '/___examples/apps/invoice/add'
            }
          ]
        },
        {
          title: 'User',
          icon: 'tabler:user',
          children: [
            {
              title: 'List',
              path: '/___examples/apps/user/list'
            },
            {
              title: 'View',
              children: [
                {
                  title: 'Account',
                  path: '/___examples/apps/user/view/account'
                },
                {
                  title: 'Security',
                  path: '/___examples/apps/user/view/security'
                },
                {
                  title: 'Billing & Plans',
                  path: '/___examples/apps/user/view/billing-plan'
                },
                {
                  title: 'Notifications',
                  path: '/___examples/apps/user/view/notification'
                },
                {
                  title: 'Connection',
                  path: '/___examples/apps/user/view/connection'
                }
              ]
            }
          ]
        },
        {
          title: 'Roles & Permissions',
          icon: 'tabler:settings',
          children: [
            {
              title: 'Roles',
              path: '/___examples/apps/roles'
            },
            {
              title: 'Permissions',
              path: '/___examples/apps/permissions'
            }
          ]
        },
        {
          title: 'Pages',
          icon: 'tabler:file',
          children: [
            {
              title: 'User Profile',
              children: [
                {
                  title: 'Profile',
                  path: '/___examples/pages/user-profile/profile'
                },
                {
                  title: 'Teams',
                  path: '/___examples/pages/user-profile/teams'
                },
                {
                  title: 'Projects',
                  path: '/___examples/pages/user-profile/projects'
                },
                {
                  title: 'Connections',
                  path: '/___examples/pages/user-profile/connections'
                }
              ]
            },
            {
              title: 'Account Settings',
              children: [
                {
                  title: 'Account',
                  path: '/___examples/pages/account-settings/account'
                },
                {
                  title: 'Security',
                  path: '/___examples/pages/account-settings/security'
                },
                {
                  title: 'Billing',
                  path: '/___examples/pages/account-settings/billing'
                },
                {
                  title: 'Notifications',
                  path: '/___examples/pages/account-settings/notifications'
                },

                {
                  title: 'Connections',
                  path: '/___examples/pages/account-settings/connections'
                }
              ]
            },
            {
              title: 'FAQ',
              path: '/___examples/pages/faq'
            },
            {
              title: 'Help Center',
              path: '/___examples/pages/help-center'
            },
            {
              title: 'Pricing',
              path: '/___examples/pages/pricing'
            },
            {
              title: 'Miscellaneous',
              children: [
                {
                  openInNewTab: true,
                  title: 'Coming Soon',
                  path: '/___examples/pages/misc/coming-soon'
                },
                {
                  openInNewTab: true,
                  title: 'Under Maintenance',
                  path: '/___examples/pages/misc/under-maintenance'
                },
                {
                  openInNewTab: true,
                  title: 'Page Not Found - 404',
                  path: '/___examples/pages/misc/404-not-found'
                },
                {
                  openInNewTab: true,
                  title: 'Not Authorized - 401',
                  path: '/___examples/pages/misc/401-not-authorized'
                },
                {
                  openInNewTab: true,
                  title: 'Server Error - 500',
                  path: '/___examples/pages/misc/500-server-error'
                }
              ]
            }
          ]
        },
        {
          title: 'Auth Pages',
          icon: 'tabler:lock',
          children: [
            {
              title: 'Login',
              children: [
                {
                  openInNewTab: true,
                  title: 'Login v1',
                  path: '/___examples/pages/auth/login-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Login v2',
                  path: '/___examples/pages/auth/login-v2'
                },
                {
                  openInNewTab: true,
                  title: 'Login With AppBar',
                  path: '/___examples/pages/auth/login-with-appbar'
                }
              ]
            },
            {
              title: 'Register',
              children: [
                {
                  openInNewTab: true,
                  title: 'Register v1',
                  path: '/___examples/pages/auth/register-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Register v2',
                  path: '/___examples/pages/auth/register-v2'
                },
                {
                  openInNewTab: true,
                  title: 'Register Multi-Steps',
                  path: '/___examples/pages/auth/register-multi-steps'
                }
              ]
            },
            {
              title: 'Verify Email',
              children: [
                {
                  openInNewTab: true,
                  title: 'Verify Email v1',
                  path: '/___examples/pages/auth/verify-email-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Verify Email v2',
                  path: '/___examples/pages/auth/verify-email-v2'
                }
              ]
            },
            {
              title: 'Forgot Password',
              children: [
                {
                  openInNewTab: true,
                  title: 'Forgot Password v1',
                  path: '/___examples/pages/auth/forgot-password-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Forgot Password v2',
                  path: '/___examples/pages/auth/forgot-password-v2'
                }
              ]
            },
            {
              title: 'Reset Password',
              children: [
                {
                  openInNewTab: true,
                  title: 'Reset Password v1',
                  path: '/___examples/pages/auth/reset-password-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Reset Password v2',
                  path: '/___examples/pages/auth/reset-password-v2'
                }
              ]
            },
            {
              title: 'Two Steps',
              children: [
                {
                  openInNewTab: true,
                  title: 'Two Steps v1',
                  path: '/___examples/pages/auth/two-steps-v1'
                },
                {
                  openInNewTab: true,
                  title: 'Two Steps v2',
                  path: '/___examples/pages/auth/two-steps-v2'
                }
              ]
            }
          ]
        },
        {
          title: 'Wizard Examples',
          icon: 'tabler:forms',
          children: [
            {
              title: 'Checkout',
              path: '/___examples/pages/wizard-examples/checkout'
            },
            {
              title: 'Property Listing',
              path: '/___examples/pages/wizard-examples/property-listing'
            },
            {
              title: 'Create Deal',
              path: '/___examples/pages/wizard-examples/create-deal'
            }
          ]
        },
        {
          icon: 'tabler:square',
          title: 'Dialog Examples',
          path: '/___examples/pages/dialog-examples'
        },
        {
          sectionTitle: 'User Interface'
        },
        {
          title: 'Typography',
          icon: 'tabler:typography',
          path: '/___examples/ui/typography'
        },
        {
          title: 'Icons',
          path: '/___examples/ui/icons',
          icon: 'tabler:brand-tabler'
        },
        {
          title: 'Cards',
          icon: 'tabler:id',
          children: [
            {
              title: 'Basic',
              path: '/___examples/ui/cards/basic'
            },
            {
              title: 'Advanced',
              path: '/___examples/ui/cards/advanced'
            },
            {
              title: 'Statistics',
              path: '/___examples/ui/cards/statistics'
            },
            {
              title: 'Widgets',
              path: '/___examples/ui/cards/widgets'
            },
            {
              title: 'Actions',
              path: '/___examples/ui/cards/actions'
            }
          ]
        },
        {
          badgeContent: '18',
          title: 'Components',
          icon: 'tabler:archive',
          badgeColor: 'primary',
          children: [
            {
              title: 'Accordion',
              path: '/___examples/components/accordion'
            },
            {
              title: 'Alerts',
              path: '/___examples/components/alerts'
            },
            {
              title: 'Avatars',
              path: '/___examples/components/avatars'
            },
            {
              title: 'Badges',
              path: '/___examples/components/badges'
            },
            {
              title: 'Buttons',
              path: '/___examples/components/buttons'
            },
            {
              title: 'Button Group',
              path: '/___examples/components/button-group'
            },
            {
              title: 'Chips',
              path: '/___examples/components/chips'
            },
            {
              title: 'Dialogs',
              path: '/___examples/components/dialogs'
            },
            {
              title: 'List',
              path: '/___examples/components/list'
            },
            {
              title: 'Menu',
              path: '/___examples/components/menu'
            },
            {
              title: 'Pagination',
              path: '/___examples/components/pagination'
            },
            {
              title: 'Ratings',
              path: '/___examples/components/ratings'
            },
            {
              title: 'Snackbar',
              path: '/___examples/components/snackbar'
            },
            {
              title: 'Swiper',
              path: '/___examples/components/swiper'
            },
            {
              title: 'Tabs',
              path: '/___examples/components/tabs'
            },
            {
              title: 'Timeline',
              path: '/___examples/components/timeline'
            },
            {
              title: 'Toasts',
              path: '/___examples/components/toast'
            },
            {
              title: 'Tree View',
              path: '/___examples/components/tree-view'
            },
            {
              title: 'More',
              path: '/___examples/components/more'
            }
          ]
        },
        {
          sectionTitle: 'Forms & Tables'
        },
        {
          title: 'Form Elements',
          icon: 'tabler:toggle-left',
          children: [
            {
              title: 'Text Field',
              path: '/___examples/forms/form-elements/text-field'
            },
            {
              title: 'Select',
              path: '/___examples/forms/form-elements/select'
            },
            {
              title: 'Checkbox',
              path: '/___examples/forms/form-elements/checkbox'
            },
            {
              title: 'Radio',
              path: '/___examples/forms/form-elements/radio'
            },
            {
              title: 'Custom Inputs',
              path: '/___examples/forms/form-elements/custom-inputs'
            },
            {
              title: 'Textarea',
              path: '/___examples/forms/form-elements/textarea'
            },
            {
              title: 'Autocomplete',
              path: '/___examples/forms/form-elements/autocomplete'
            },
            {
              title: 'Date Pickers',
              path: '/___examples/forms/form-elements/pickers'
            },
            {
              title: 'Switch',
              path: '/___examples/forms/form-elements/switch'
            },
            {
              title: 'File Uploader',
              path: '/___examples/forms/form-elements/file-uploader'
            },
            {
              title: 'Editor',
              path: '/___examples/forms/form-elements/editor'
            },
            {
              title: 'Slider',
              path: '/___examples/forms/form-elements/slider'
            },
            {
              title: 'Input Mask',
              path: '/___examples/forms/form-elements/input-mask'
            }
          ]
        },
        {
          icon: 'tabler:layout-navbar',
          title: 'Form Layouts',
          path: '/___examples/forms/form-layouts'
        },
        {
          title: 'Form Validation',
          path: '/___examples/forms/form-validation',
          icon: 'tabler:checkbox'
        },
        {
          title: 'Form Wizard',
          path: '/___examples/forms/form-wizard',
          icon: 'tabler:text-wrap-disabled'
        },
        {
          title: 'Table',
          icon: 'tabler:table',
          path: '/___examples/tables/mui'
        },
        {
          title: 'Mui DataGrid',
          icon: 'tabler:layout-grid',
          path: '/___examples/tables/data-grid'
        },
        {
          sectionTitle: 'Charts & Misc'
        },
        {
          title: 'Charts',
          icon: 'tabler:chart-pie',
          children: [
            {
              title: 'Apex',
              path: '/___examples/charts/apex-charts'
            },
            {
              title: 'Recharts',
              path: '/___examples/charts/recharts'
            },
            {
              title: 'ChartJS',
              path: '/___examples/charts/chartjs'
            }
          ]
        },
        {
          path: '/___examples/acl',
          action: 'read',
          subject: 'acl-page',
          icon: 'tabler:shield',
          title: 'Access Control'
        },
        {
          title: 'Others',
          icon: 'tabler:dots',
          children: [
            {
              title: 'Menu Levels',
              children: [
                {
                  title: 'Menu Level 2.1'
                },
                {
                  title: 'Menu Level 2.2',
                  children: [
                    {
                      title: 'Menu Level 3.1'
                    },
                    {
                      title: 'Menu Level 3.2'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Disabled Menu',
              disabled: true
            },
            {
              title: 'Raise Support',
              externalLink: true,
              openInNewTab: true,
              path: 'https://pixinvent.ticksy.com/'
            },
            {
              title: 'Documentation',
              externalLink: true,
              openInNewTab: true,
              path: 'https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/'
            }
          ]
        }
      ]
    }
  ]
}

export default navigation
