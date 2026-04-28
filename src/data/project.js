export const projectStack = [
  'Ruby on Rails 7',
  'PostgreSQL',
  'Devise',
  'Action Policy',
  'Tailwind CSS',
  'Turbo + Stimulus',
  'RSpec',
  'Sidekiq',
  'Active Storage',
];

export const projectStories = [
  {
    id: 's01',
    fr: ['Patient', 'Je peux parcourir les médecins, choisir un créneau disponible et réserver un rendez-vous.'],
    en: ['Patient', 'I can browse doctors, choose an available slot, and book an appointment.'],
  },
  {
    id: 's02',
    fr: ['Médecin', 'Je peux voir mes rendez-vous, confirmer ou annuler une demande et gérer mes disponibilités.'],
    en: ['Doctor', 'I can view my appointments, confirm or cancel requests, and manage availability.'],
  },
  {
    id: 's03',
    fr: ['Admin', 'Je peux superviser tous les rendez-vous, filtrer les données et exporter un CSV.'],
    en: ['Admin', 'I can supervise all appointments, filter data, and export CSV.'],
  },
];

export const projectReferences = [
  ['Rails Guides', 'https://guides.rubyonrails.org/'],
  ['Devise', 'https://github.com/heartcombo/devise'],
  ['Action Policy', 'https://github.com/palkan/action_policy'],
  ['RSpec Rails', 'https://rspec.info/documentation/8.0/rspec-rails/'],
  ['Sidekiq', 'https://github.com/sidekiq/sidekiq'],
];

export const commands = [
  ['Créer l’app Rails', 'rails new meditrack --database=postgresql --css=tailwind'],
  ['Gems à ajouter', "gem 'devise' · gem 'action_policy' · gem 'sidekiq' · gem 'rspec-rails'"],
  ['Setup Devise', 'rails generate devise:install && rails generate devise User'],
  ['Générer Appointment', 'rails g model Appointment doctor:references patient:references scheduled_at:datetime status:integer notes:text'],
];

const commandEn = {
  'Créer l’app Rails': 'Create the Rails app',
  'Gems à ajouter': 'Gems to add',
  'Setup Devise': 'Set up Devise',
  'Générer Appointment': 'Generate Appointment',
};

export const features = [
  {
    phase: 2,
    phaseName: 'Phase 2 - Construction',
    items: [
      {
        id: 'f01',
        name: 'Setup & authentification',
        desc: 'Installer Rails, Devise, PostgreSQL. Créer User avec rôles patient / doctor / admin et protéger les controllers.',
        topics: ['Devise', 'Routing', 'Roles', 'Controllers', 'Flash messages'],
        steps: ['Créer l’app Rails + PostgreSQL', 'Installer Devise', 'Ajouter enum role sur User', 'Protéger les controllers privés'],
        acceptance: ['Inscription/login fonctionnels', 'current_user disponible', 'Accès privé redirige les visiteurs'],
        refs: ['Devise', 'Rails Routing'],
      },
      {
        id: 'f02',
        name: 'CRUD Appointments',
        desc: 'Créer les rendez-vous avec associations, validations, controller REST et vues principales.',
        topics: ['Associations', 'Validations', 'Strong Params', 'MVC', 'Migrations'],
        steps: ['Créer Appointment', 'Associer doctor/patient vers User', 'Ajouter validations métier', 'Créer vues index/show/new/edit'],
        acceptance: ['RDV invalide refusé', 'Patient voit ses RDV', 'Status affiché clairement'],
        refs: ['ActiveRecord Associations', 'Rails Controllers'],
      },
      {
        id: 'f03',
        name: 'Autorisation avec Action Policy',
        desc: 'Limiter les données selon le rôle: patient, médecin ou admin, avec policies et scopes Action Policy.',
        topics: ['Action Policy', 'authorize!', 'authorized_scope', 'Callbacks'],
        steps: ['Installer Action Policy', 'Créer ApplicationPolicy', 'Créer AppointmentPolicy', 'Appliquer authorized_scope dans index'],
        acceptance: ['Patient isolé', 'Médecin isolé', 'Admin voit tout'],
        refs: ['Action Policy'],
      },
      {
        id: 'f04',
        name: 'Interface Tailwind + formulaires',
        desc: 'Construire les écrans ERB, formulaires, liste des rendez-vous, badges de statut et partials.',
        topics: ['Views', 'Tailwind', 'Forms', 'Helpers', 'ERB'],
        steps: ['Créer layout app', 'Créer partial appointment_card', 'Styliser les statuts', 'Afficher erreurs de formulaire'],
        acceptance: ['Formulaire clair', 'UI responsive', 'Aucune duplication majeure'],
        refs: ['Rails Form Helpers', 'Tailwind'],
      },
      {
        id: 'f05',
        name: 'Upload photo médecin',
        desc: 'Ajouter Active Storage pour avatar médecin avec validations taille/type et affichage public contrôlé.',
        topics: ['Active Storage', 'Attachments', 'Validations fichiers', 'File security'],
        steps: ['Installer Active Storage', 'Ajouter avatar au profil médecin', 'Valider type/taille', 'Afficher une variante'],
        acceptance: ['Upload image OK', 'Fichier invalide refusé', 'Avatar affiché dans la liste médecins'],
        refs: ['Active Storage'],
      },
      {
        id: 'f06',
        name: 'Tests RSpec de base',
        desc: 'Tester models, factories, request specs et policies pour sécuriser le coeur du projet.',
        topics: ['RSpec', 'FactoryBot', 'Request specs', 'Policy testing'],
        steps: ['Installer RSpec', 'Créer factories', 'Tester Appointment', 'Tester accès non authentifié'],
        acceptance: ['Suite verte', 'Cas invalides couverts', 'Policies testées'],
        refs: ['RSpec Rails', 'FactoryBot'],
      },
    ],
  },
  {
    phase: 3,
    phaseName: 'Phase 3 - Production',
    items: [
      {
        id: 'f07',
        name: 'Déploiement sur Render',
        desc: 'Configurer env vars, credentials, migrations prod et lecture des logs.',
        topics: ['Deployment', 'Credentials', 'Logs prod'],
        steps: ['Préparer variables env', 'Configurer database prod', 'Déployer', 'Lire logs et corriger erreurs'],
        acceptance: ['App accessible en ligne', 'Migrations exécutées', 'Logs propres'],
        refs: ['Render Rails'],
      },
      {
        id: 'f08',
        name: 'Emails de confirmation',
        desc: 'Créer AppointmentMailer et envoyer confirmations/rappels avec deliver_later.',
        topics: ['ActionMailer', 'Mail previews', 'ActiveJob'],
        steps: ['Créer mailer', 'Ajouter preview', 'Déclencher deliver_later', 'Configurer SMTP/dev mailer'],
        acceptance: ['Preview OK', 'Email créé à la réservation', 'Pas d’envoi bloquant dans request'],
        refs: ['ActionMailer'],
      },
      {
        id: 'f09',
        name: 'Jobs Sidekiq',
        desc: 'Planifier les rappels automatiques et gérer les erreurs si le rendez-vous change.',
        topics: ['Sidekiq', 'Retry jobs', 'Async emails'],
        steps: ['Configurer Sidekiq', 'Créer ReminderJob', 'Planifier rappel', 'Gérer RDV annulé'],
        acceptance: ['Job visible', 'Retry configuré', 'Aucun rappel pour RDV annulé'],
        refs: ['Sidekiq'],
      },
      {
        id: 'f10',
        name: 'Recherche et filtres',
        desc: 'Filtrer par médecin, statut, date et paginer les résultats avec index DB adaptés.',
        topics: ['Ransack', 'Kaminari', 'Scopes', 'Indexes'],
        steps: ['Ajouter filtres', 'Ajouter pagination', 'Ajouter indexes', 'Tester queries'],
        acceptance: ['Filtres combinables', 'Pagination stable', 'Pas de N+1 évident'],
        refs: ['Ransack', 'Kaminari'],
      },
      {
        id: 'f11',
        name: 'Export CSV admin',
        desc: 'Exporter les rendez-vous en CSV depuis le dashboard admin avec endpoint protégé.',
        topics: ['CSV export', 'authorize!', 'Controllers'],
        steps: ['Créer action export', 'Générer CSV', 'Protéger admin only', 'Tester download'],
        acceptance: ['CSV téléchargeable', 'Colonnes attendues', 'Accès refusé hors admin'],
        refs: ['Ruby CSV'],
      },
      {
        id: 'f12',
        name: 'API JSON',
        desc: 'Créer /api/v1, sérialiser les rendez-vous et préparer une authentification token.',
        topics: ['JSON', 'REST', 'Serializers', 'Versioning API'],
        steps: ['Créer namespace API', 'Ajouter serializers', 'Répondre JSON', 'Préparer auth token'],
        acceptance: ['GET index JSON', 'Format stable', 'Erreurs JSON propres'],
        refs: ['Rails API'],
      },
      {
        id: 'f13',
        name: 'Sécurité renforcée',
        desc: 'Rate limiting, vérification CSRF, fichiers privés et protections XSS.',
        topics: ['Rate limiting', 'CSRF', 'Signed IDs', 'XSS'],
        steps: ['Installer rack-attack', 'Limiter endpoints sensibles', 'Vérifier CSRF', 'Auditer uploads'],
        acceptance: ['429 sur abus', 'CSRF actif', 'Uploads protégés'],
        refs: ['Rack::Attack', 'Rails Security'],
      },
    ],
  },
  {
    phase: 4,
    phaseName: 'Phase 4 - Excellence',
    items: [
      {
        id: 'f14',
        name: 'Notifications temps réel',
        desc: 'Afficher le changement de statut en direct avec Turbo Streams et ActionCable.',
        topics: ['Turbo Streams', 'ActionCable', 'Turbo'],
        steps: ['Ajouter stream par user', 'Broadcast status', 'Mettre à jour badge', 'Tester deux sessions'],
        acceptance: ['Update sans refresh', 'Scope utilisateur respecté', 'Fallback OK'],
        refs: ['Turbo', 'ActionCable'],
      },
      {
        id: 'f15',
        name: 'Service Object réservation',
        desc: 'Extraire la logique métier dans AppointmentBookingService avec transaction.',
        topics: ['Service Objects', 'Transactions', 'Clean code'],
        steps: ['Créer service', 'Valider disponibilité', 'Créer RDV en transaction', 'Déclencher email/job'],
        acceptance: ['Service testable', 'Rollback si erreur', 'Controller plus court'],
        refs: ['ActiveRecord Transactions'],
      },
      {
        id: 'f16',
        name: 'Dashboard admin avec caching',
        desc: 'Stats métier, cache Rails, optimisation des requêtes et graphes simples.',
        topics: ['Caching', 'Queries optimisation', 'N+1'],
        steps: ['Définir KPIs', 'Optimiser queries', 'Ajouter cache 5 min', 'Afficher graphes simples'],
        acceptance: ['Stats correctes', 'N+1 évité', 'Cache invalidable'],
        refs: ['Rails Caching'],
      },
      {
        id: 'f17',
        name: 'Refactoring & Query Objects',
        desc: 'Isoler les requêtes complexes, clarifier les scopes et nettoyer les concerns.',
        topics: ['Query Objects', 'Scopes', 'Refactoring'],
        steps: ['Identifier queries longues', 'Créer Query Objects', 'Nettoyer controllers', 'Ajouter specs'],
        acceptance: ['Code plus lisible', 'Specs vertes', 'Aucune régression UI'],
        refs: ['Query Objects'],
      },
    ],
  },
];

const featureEn = {
  f01: ['Setup & authentication', 'Install Rails, Devise, and PostgreSQL. Create User with patient / doctor / admin roles and protect controllers.'],
  f02: ['Appointments CRUD', 'Create appointments with associations, validations, REST controller, and core views.'],
  f03: ['Authorization with Action Policy', 'Limit data by role: patient, doctor, or admin, using Action Policy policies and scopes.'],
  f04: ['Tailwind UI + forms', 'Build ERB screens, forms, appointment lists, status badges, and reusable partials.'],
  f05: ['Doctor profile photo upload', 'Add Active Storage for doctor avatars with size/type validations and controlled display.'],
  f06: ['Basic RSpec tests', 'Test models, factories, request specs, and policies to protect the project core.'],
  f07: ['Deploy on Render', 'Configure env vars, credentials, production migrations, and log reading.'],
  f08: ['Confirmation emails', 'Create AppointmentMailer and send confirmations/reminders with deliver_later.'],
  f09: ['Sidekiq jobs', 'Schedule automatic reminders and handle errors if the appointment changes.'],
  f10: ['Search and filters', 'Filter by doctor, status, and date, then paginate with proper DB indexes.'],
  f11: ['Admin CSV export', 'Export appointments as CSV from the admin dashboard with a protected endpoint.'],
  f12: ['JSON API', 'Create /api/v1, serialize appointments, and prepare token authentication.'],
  f13: ['Stronger security', 'Rate limiting, CSRF checks, private files, and XSS protections.'],
  f14: ['Realtime notifications', 'Show status changes live with Turbo Streams and ActionCable.'],
  f15: ['Booking Service Object', 'Extract booking business logic into AppointmentBookingService with transactions.'],
  f16: ['Cached admin dashboard', 'Business stats, Rails cache, query optimization, and simple charts.'],
  f17: ['Refactoring & Query Objects', 'Isolate complex queries, clarify scopes, and clean shared concerns.'],
};

const featureExtrasEn = {
  f01: {
    steps: ['Create the Rails app + PostgreSQL', 'Install Devise', 'Add role enum on User', 'Protect private controllers'],
    acceptance: ['Signup/login work', 'current_user is available', 'Private access redirects visitors'],
  },
  f02: {
    steps: ['Create Appointment', 'Associate doctor/patient to User', 'Add business validations', 'Create index/show/new/edit views'],
    acceptance: ['Invalid appointment rejected', 'Patient sees own appointments', 'Status is clearly displayed'],
  },
  f03: {
    steps: ['Install Action Policy', 'Create ApplicationPolicy', 'Create AppointmentPolicy', 'Use authorized_scope in index'],
    acceptance: ['Patient isolated', 'Doctor isolated', 'Admin sees all'],
  },
  f04: {
    steps: ['Create app layout', 'Create appointment_card partial', 'Style statuses', 'Show form errors'],
    acceptance: ['Clear form', 'Responsive UI', 'No major duplication'],
  },
  f05: {
    steps: ['Install Active Storage', 'Attach avatar to doctor profile', 'Validate type/size', 'Render a variant'],
    acceptance: ['Image upload works', 'Invalid file rejected', 'Avatar shown in doctor list'],
  },
  f06: {
    steps: ['Install RSpec', 'Create factories', 'Test Appointment', 'Test unauthenticated access'],
    acceptance: ['Green test suite', 'Invalid cases covered', 'Policies tested'],
  },
};

const phaseNameEn = {
  2: 'Phase 2 - Build',
  3: 'Phase 3 - Production',
  4: 'Phase 4 - Excellence',
};

export function localizedCommands(lang) {
  if (lang !== 'en') return commands;
  return commands.map(([label, command]) => [commandEn[label] || label, command]);
}

export function localizedFeatures(lang) {
  if (lang !== 'en') return features;
  return features.map((phase) => ({
    ...phase,
    phaseName: phaseNameEn[phase.phase] || phase.phaseName,
    items: phase.items.map((feature) => {
      const translated = featureEn[feature.id];
      const extras = featureExtrasEn[feature.id] || {};
      return translated ? { ...feature, ...extras, name: translated[0], desc: translated[1] } : { ...feature, ...extras };
    }),
  }));
}

export function localizedStories(lang) {
  return projectStories.map((story) => {
    const [role, text] = story[lang === 'en' ? 'en' : 'fr'];
    return { id: story.id, role, text };
  });
}

const featureBlueprints = {
  f01: {
    screens: ['Register', 'Login', 'Account profile', 'Protected dashboard'],
    files: ['app/models/user.rb', 'app/controllers/application_controller.rb', 'config/routes.rb', 'db/migrate/*_devise_create_users.rb'],
  },
  f02: {
    screens: ['Appointments index', 'Appointment show', 'New appointment form', 'Edit appointment form'],
    files: ['app/models/appointment.rb', 'app/controllers/appointments_controller.rb', 'app/views/appointments/*', 'db/migrate/*_create_appointments.rb'],
  },
  f03: {
    screens: ['Patient appointments', 'Doctor appointments', 'Admin appointments', 'Access denied state'],
    files: ['app/policies/application_policy.rb', 'app/policies/appointment_policy.rb', 'app/controllers/appointments_controller.rb', 'spec/policies/appointment_policy_spec.rb'],
  },
  f04: {
    screens: ['Appointments list', 'Appointment card', 'Appointment form', 'Status badges'],
    files: ['app/views/layouts/application.html.erb', 'app/views/appointments/_appointment_card.html.erb', 'app/helpers/appointments_helper.rb'],
  },
  f05: {
    screens: ['Doctor profile form', 'Doctor list avatar', 'Upload validation error', 'Default avatar state'],
    files: ['app/models/doctor_profile.rb', 'app/views/doctor_profiles/*', 'config/storage.yml'],
  },
  f06: {
    screens: ['Test output', 'Model spec', 'Request spec', 'Policy spec'],
    files: ['spec/models/appointment_spec.rb', 'spec/requests/appointments_spec.rb', 'spec/factories/*', 'spec/policies/*'],
  },
  default: {
    screens: ['Main screen', 'Form state', 'Empty state', 'Error state'],
    files: ['app/models/*', 'app/controllers/*', 'app/views/*', 'spec/*'],
  },
};

export function projectFeatureBlueprint(feature) {
  return featureBlueprints[feature.id] || featureBlueprints.default;
}
