export const topics = [
  { cat: 'Ruby', name: 'Syntaxe de base', sub: 'variables, conditions, boucles', level: 'Fondamental', phase: 1 },
  { cat: 'Ruby', name: 'Structures de données', sub: 'array, hash', level: 'Fondamental', phase: 1 },
  { cat: 'Ruby', name: 'OOP', sub: 'classes, modules, héritage', level: 'Fondamental', phase: 1 },
  { cat: 'Ruby', name: 'Enumerable', sub: 'map, select, reduce', level: 'Fondamental', phase: 1 },
  { cat: 'Ruby', name: 'Gestion erreurs', sub: 'begin/rescue', level: 'Fondamental', phase: 1 },
  { cat: 'Ruby', name: 'Blocks & Procs', sub: 'closures et blocks', level: 'Moyen', phase: 1 },
  { cat: 'Ruby', name: 'Symbols & Frozen strings', sub: 'performance Ruby', level: 'Moyen', phase: 2, isNew: true },
  { cat: 'Ruby', name: 'Metaprogramming bases', sub: 'method_missing, define_method', level: 'Avancé', phase: 4, isNew: true },

  { cat: 'Rails', name: 'MVC', sub: 'architecture globale', level: 'Fondamental', phase: 1 },
  { cat: 'Rails', name: 'Routing', sub: 'routes REST', level: 'Fondamental', phase: 1 },
  { cat: 'Rails', name: 'Controllers', sub: 'actions, params', level: 'Fondamental', phase: 1 },
  { cat: 'Rails', name: 'Views', sub: 'ERB, partials', level: 'Fondamental', phase: 1 },
  { cat: 'Rails', name: 'Strong Params', sub: 'sécuriser params', level: 'Fondamental', phase: 1 },
  { cat: 'Rails', name: 'Helpers', sub: 'logique view', level: 'Moyen', phase: 2 },
  { cat: 'Rails', name: 'Callbacks', sub: 'before_action etc', level: 'Moyen', phase: 2 },
  { cat: 'Rails', name: 'Flash messages', sub: 'notice, alert', level: 'Fondamental', phase: 1, isNew: true },
  { cat: 'Rails', name: 'Concerns', sub: 'partager logique models/controllers', level: 'Moyen', phase: 2, isNew: true },

  { cat: 'ActiveRecord', name: 'Associations', sub: 'belongs_to, has_many', level: 'Fondamental', phase: 1 },
  { cat: 'ActiveRecord', name: 'Validations', sub: 'présence, unicité', level: 'Fondamental', phase: 1 },
  { cat: 'ActiveRecord', name: 'Queries', sub: 'where, joins', level: 'Fondamental', phase: 1 },
  { cat: 'ActiveRecord', name: 'Migrations', sub: 'créer/modifier tables', level: 'Fondamental', phase: 1, isNew: true },
  { cat: 'ActiveRecord', name: 'Scopes', sub: 'requêtes réutilisables', level: 'Moyen', phase: 2 },
  { cat: 'ActiveRecord', name: 'Callbacks model', sub: 'before_save, after_create', level: 'Moyen', phase: 2, isNew: true },
  { cat: 'ActiveRecord', name: 'Transactions', sub: 'atomicité', level: 'Avancé', phase: 3 },
  { cat: 'ActiveRecord', name: 'N+1', sub: 'includes, eager loading', level: 'Avancé', phase: 3 },
  { cat: 'ActiveRecord', name: 'Polymorphic associations', sub: 'as: :commentable', level: 'Avancé', phase: 4, isNew: true },
  { cat: 'ActiveRecord', name: 'Counter cache', sub: 'optimiser comptages', level: 'Avancé', phase: 4, isNew: true },

  { cat: 'Database', name: 'SQL', sub: 'SELECT, JOIN', level: 'Fondamental', phase: 1 },
  { cat: 'Database', name: 'Relations', sub: 'foreign keys', level: 'Fondamental', phase: 1 },
  { cat: 'Database', name: 'Indexes', sub: 'optimisation', level: 'Avancé', phase: 3 },
  { cat: 'Database', name: 'Constraints', sub: 'NOT NULL, UNIQUE', level: 'Avancé', phase: 3 },

  { cat: 'Frontend', name: 'ERB', sub: 'rendering', level: 'Fondamental', phase: 1 },
  { cat: 'Frontend', name: 'Forms', sub: 'formulaires Rails', level: 'Fondamental', phase: 1 },
  { cat: 'Frontend', name: 'Tailwind', sub: 'UI styling', level: 'Fondamental', phase: 2 },
  { cat: 'Frontend', name: 'Turbo', sub: 'interactivité', level: 'Moyen', phase: 2 },
  { cat: 'Frontend', name: 'Stimulus', sub: 'JS léger', level: 'Moyen', phase: 2 },
  { cat: 'Frontend', name: 'Importmap / Propshaft', sub: 'assets pipeline', level: 'Moyen', phase: 2, isNew: true },

  { cat: 'Config & Env', name: "Variables d'env", sub: '.env, credentials', level: 'Fondamental', phase: 2, isNew: true },
  { cat: 'Config & Env', name: 'Rails credentials', sub: 'secrets chiffrés', level: 'Fondamental', phase: 2, isNew: true },
  { cat: 'Config & Env', name: 'config/environments', sub: 'dev vs prod vs test', level: 'Moyen', phase: 2, isNew: true },
  { cat: 'Config & Env', name: 'Initializers', sub: 'config au démarrage', level: 'Moyen', phase: 2, isNew: true },

  { cat: 'Deployment', name: 'Heroku / Render / Fly.io', sub: 'déployer une app', level: 'Fondamental', phase: 3, isNew: true },
  { cat: 'Deployment', name: 'Migrations en prod', sub: 'db:migrate deploy', level: 'Fondamental', phase: 3, isNew: true },
  { cat: 'Deployment', name: "Variables d'env prod", sub: 'config serveur', level: 'Fondamental', phase: 3, isNew: true },
  { cat: 'Deployment', name: 'Logs prod', sub: 'lire les logs', level: 'Moyen', phase: 3, isNew: true },

  { cat: 'Auth', name: 'Devise', sub: 'authentification', level: 'Fondamental', phase: 2 },
  { cat: 'Auth', name: 'Roles', sub: 'admin/user', level: 'Fondamental', phase: 2 },
  { cat: 'Auth', name: 'Policies (Action Policy)', sub: 'permissions utilisateur', level: 'Fondamental', phase: 2 },
  { cat: 'Auth', name: 'authorize!', sub: 'contrôle accès controller', level: 'Fondamental', phase: 2 },
  { cat: 'Auth', name: 'Policy Scope', sub: 'filtrage données', level: 'Avancé', phase: 3 },

  { cat: 'Testing', name: 'RSpec', sub: 'tests unitaires', level: 'Fondamental', phase: 2 },
  { cat: 'Testing', name: 'FactoryBot', sub: 'data test', level: 'Fondamental', phase: 2 },
  { cat: 'Testing', name: 'Request specs', sub: 'tests API', level: 'Moyen', phase: 2 },
  { cat: 'Testing', name: 'Mocks & Stubs', sub: 'allow, expect', level: 'Moyen', phase: 2, isNew: true },
  { cat: 'Testing', name: 'System tests', sub: 'tests UI', level: 'Moyen', phase: 3 },
  { cat: 'Testing', name: 'Policy testing', sub: 'test permissions', level: 'Avancé', phase: 3 },
  { cat: 'Testing', name: 'Shared examples', sub: 'DRY tests', level: 'Avancé', phase: 4, isNew: true },

  { cat: 'Git', name: 'Basics', sub: 'commit, push, pull', level: 'Fondamental', phase: 1 },
  { cat: 'Git', name: 'Branching', sub: 'branches', level: 'Fondamental', phase: 1 },
  { cat: 'Git', name: 'Pull Requests', sub: 'code review workflow', level: 'Fondamental', phase: 1, isNew: true },
  { cat: 'Git', name: 'Debug git', sub: 'logs, reset', level: 'Moyen', phase: 2 },
  { cat: 'Git', name: 'Rebase', sub: 'historique propre', level: 'Avancé', phase: 3 },

  { cat: 'Debugging', name: 'Logs', sub: 'logs Rails', level: 'Fondamental', phase: 1 },
  { cat: 'Debugging', name: 'Console', sub: 'rails console', level: 'Fondamental', phase: 1 },
  { cat: 'Debugging', name: 'Byebug / Pry', sub: 'breakpoints', level: 'Fondamental', phase: 1, isNew: true },
  { cat: 'Debugging', name: 'Stack trace', sub: 'erreurs', level: 'Avancé', phase: 2 },

  { cat: 'Emails', name: 'ActionMailer', sub: 'envoyer emails', level: 'Fondamental', phase: 2 },
  { cat: 'Emails', name: 'Mail previews', sub: 'tester mails', level: 'Fondamental', phase: 2 },
  { cat: 'Emails', name: 'Async emails', sub: 'jobs emails', level: 'Moyen', phase: 3 },

  { cat: 'Storage', name: 'Active Storage', sub: 'upload fichiers', level: 'Fondamental', phase: 2 },
  { cat: 'Storage', name: 'Attachments', sub: 'fichiers liés models', level: 'Fondamental', phase: 2 },
  { cat: 'Storage', name: 'Validations fichiers', sub: 'taille/type', level: 'Moyen', phase: 2 },
  { cat: 'Storage', name: 'Signed IDs', sub: 'sécurité fichiers', level: 'Avancé', phase: 3 },

  { cat: 'Jobs', name: 'ActiveJob', sub: 'jobs async', level: 'Moyen', phase: 3 },
  { cat: 'Jobs', name: 'Sidekiq', sub: 'background jobs', level: 'Avancé', phase: 3 },
  { cat: 'Jobs', name: 'Retry jobs', sub: 'gestion erreurs', level: 'Avancé', phase: 4 },

  { cat: 'API', name: 'JSON', sub: 'réponses API', level: 'Fondamental', phase: 2 },
  { cat: 'API', name: 'REST', sub: 'bonnes pratiques', level: 'Fondamental', phase: 2 },
  { cat: 'API', name: 'Serializers', sub: 'blueprinter, jsonapi', level: 'Moyen', phase: 3, isNew: true },
  { cat: 'API', name: 'Pagination', sub: 'limiter data', level: 'Moyen', phase: 3 },
  { cat: 'API', name: 'Versioning API', sub: '/api/v1', level: 'Moyen', phase: 3, isNew: true },

  { cat: 'Realtime', name: 'Turbo Streams', sub: 'temps réel', level: 'Moyen', phase: 4 },
  { cat: 'Realtime', name: 'ActionCable', sub: 'websocket', level: 'Avancé', phase: 4 },
  { cat: 'Search & Pages', name: 'Ransack', sub: 'filtres', level: 'Fondamental', phase: 3 },
  { cat: 'Search & Pages', name: 'Kaminari', sub: 'pagination', level: 'Fondamental', phase: 3 },
  { cat: 'Files & Export', name: 'CSV export', sub: 'export data', level: 'Moyen', phase: 3 },
  { cat: 'Files & Export', name: 'PDF export', sub: 'Prawn, WickedPDF', level: 'Moyen', phase: 3, isNew: true },

  { cat: 'Security', name: 'CSRF', sub: 'protection', level: 'Fondamental', phase: 2 },
  { cat: 'Security', name: 'Strong params', sub: 'filtrage', level: 'Fondamental', phase: 1 },
  { cat: 'Security', name: 'CORS', sub: 'config cross-origin', level: 'Moyen', phase: 3, isNew: true },
  { cat: 'Security', name: 'XSS', sub: 'protection', level: 'Avancé', phase: 3 },
  { cat: 'Security', name: 'Rate limiting', sub: 'rack-attack', level: 'Avancé', phase: 3, isNew: true },
  { cat: 'Security', name: 'File security', sub: 'upload sécurisé', level: 'Avancé', phase: 3 },

  { cat: 'Performance', name: 'Bullet gem', sub: 'détecter N+1', level: 'Moyen', phase: 3, isNew: true },
  { cat: 'Performance', name: 'Queries optimisation', sub: 'améliorer DB', level: 'Avancé', phase: 4 },
  { cat: 'Performance', name: 'Caching', sub: 'Rails.cache', level: 'Avancé', phase: 4 },

  { cat: 'Architecture', name: 'Clean code', sub: 'lisibilité', level: 'Fondamental', phase: 2 },
  { cat: 'Architecture', name: 'Service Objects', sub: 'logique métier', level: 'Avancé', phase: 4 },
  { cat: 'Architecture', name: 'Refactoring', sub: 'améliorer code', level: 'Avancé', phase: 4 },
  { cat: 'Architecture', name: 'Form Objects', sub: 'multi-model forms', level: 'Avancé', phase: 4, isNew: true },
  { cat: 'Architecture', name: 'Query Objects', sub: 'isoler requêtes complexes', level: 'Avancé', phase: 4, isNew: true },

  { cat: 'Web', name: 'HTTP', sub: 'GET, POST', level: 'Fondamental', phase: 1 },
  { cat: 'Web', name: 'Status codes', sub: '200, 404', level: 'Fondamental', phase: 1 },
  { cat: 'Web', name: 'Sessions', sub: 'cookies', level: 'Moyen', phase: 2 },
  { cat: 'Web', name: 'Headers HTTP', sub: 'auth, content-type', level: 'Moyen', phase: 3, isNew: true },

  { cat: 'Advanced', name: 'Data integrity', sub: 'cohérence DB', level: 'Avancé', phase: 4 },
  { cat: 'Advanced', name: 'Monitoring', sub: 'logs prod', level: 'Moyen', phase: 3 },
  { cat: 'Advanced', name: 'Concurrency', sub: 'race conditions', level: 'Avancé', phase: 4 },

  { cat: 'Soft Skills', name: 'Communication', sub: 'expliquer code', level: 'Fondamental', phase: 1 },
  { cat: 'Soft Skills', name: 'Lecture code', sub: 'comprendre projet', level: 'Fondamental', phase: 1 },
  { cat: 'Soft Skills', name: 'Autonomie', sub: 'résoudre seul', level: 'Fondamental', phase: 2 },
  { cat: 'Soft Skills', name: 'Documentation', sub: 'README, inline docs', level: 'Fondamental', phase: 2, isNew: true },
  { cat: 'Soft Skills', name: 'Compréhension métier', sub: 'logique business', level: 'Avancé', phase: 4 },
];

export const phases = [
  {
    id: 1,
    label: '01',
    name: 'Fondations',
    duration: '4 - 6 semaines',
    tone: 'phaseOne',
    tagline: 'Les bases absolues pour construire ta première app Rails',
    modules: ['Ruby', 'Rails MVC', 'ActiveRecord', 'Database', 'Frontend bases', 'Git', 'Debugging', 'Web', 'Soft Skills'],
  },
  {
    id: 2,
    label: '02',
    name: 'Construction',
    duration: '6 - 8 semaines',
    tone: 'phaseTwo',
    tagline: 'Construire des apps complètes avec auth, tests et interface',
    modules: ['Auth', 'Rails avancé', 'Frontend', 'Testing', 'Storage', 'Emails', 'API bases', 'Security bases'],
  },
  {
    id: 3,
    label: '03',
    name: 'Production',
    duration: '4 - 6 semaines',
    tone: 'phaseThree',
    tagline: 'Déployer, sécuriser et optimiser des apps en production',
    modules: ['Deployment', 'Jobs', 'API externe', 'Testing avancé', 'Security', 'Performance', 'Export'],
  },
  {
    id: 4,
    label: '04',
    name: 'Excellence',
    duration: 'Continu',
    tone: 'phaseFour',
    tagline: 'Patterns avancés, performance et maîtrise complète',
    modules: ['Architecture', 'Realtime', 'Ruby avancé', 'Testing expert', 'Soft Skills'],
  },
];

export function topicKey(topic) {
  return `${topic.cat}::${topic.name}`;
}

export function categories() {
  return [...new Set(topics.map((topic) => topic.cat))];
}

const categoryEn = {
  'Config & Env': 'Config & Env',
  'API externe': 'External API',
  'Search & Pages': 'Search & Pagination',
  'Files & Export': 'Files & Export',
  Sécurity: 'Security',
  Advanced: 'Advanced',
  'Soft Skills': 'Soft Skills',
};

const phaseEn = {
  1: {
    name: 'Foundations',
    duration: '4 - 6 weeks',
    tagline: 'The core basics to build your first Rails app',
  },
  2: {
    name: 'Build',
    duration: '6 - 8 weeks',
    tagline: 'Build complete apps with auth, tests, and interface work',
  },
  3: {
    name: 'Production',
    duration: '4 - 6 weeks',
    tagline: 'Deploy, secure, and optimize Rails apps in production',
  },
  4: {
    name: 'Excellence',
    duration: 'Ongoing',
    tagline: 'Advanced patterns, performance, and full-stack mastery',
  },
};

const topicEn = {
  'Ruby::Syntaxe de base': ['Basic syntax', 'variables, conditionals, loops'],
  'Ruby::Structures de données': ['Data structures', 'arrays, hashes'],
  'Ruby::OOP': ['OOP', 'classes, modules, inheritance'],
  'Ruby::Gestion erreurs': ['Error handling', 'begin/rescue'],
  'Ruby::Blocks & Procs': ['Blocks & Procs', 'closures and blocks'],
  'Ruby::Symbols & Frozen strings': ['Symbols & frozen strings', 'Ruby performance'],
  'Ruby::Metaprogramming bases': ['Metaprogramming basics', 'method_missing, define_method'],
  'Rails::MVC': ['MVC', 'global architecture'],
  'Rails::Routing': ['Routing', 'REST routes'],
  'Rails::Controllers': ['Controllers', 'actions, params'],
  'Rails::Views': ['Views', 'ERB, partials'],
  'Rails::Strong Params': ['Strong Params', 'secure params'],
  'Rails::Helpers': ['Helpers', 'view logic'],
  'Rails::Callbacks': ['Callbacks', 'before_action, callbacks'],
  'Rails::Flash messages': ['Flash messages', 'notice, alert'],
  'Rails::Concerns': ['Concerns', 'share model/controller logic'],
  'ActiveRecord::Associations': ['Associations', 'belongs_to, has_many'],
  'ActiveRecord::Validations': ['Validations', 'presence, uniqueness'],
  'ActiveRecord::Queries': ['Queries', 'where, joins'],
  'ActiveRecord::Migrations': ['Migrations', 'create/modify tables'],
  'ActiveRecord::Scopes': ['Scopes', 'reusable queries'],
  'ActiveRecord::Callbacks model': ['Model callbacks', 'before_save, after_create'],
  'ActiveRecord::Transactions': ['Transactions', 'atomic operations'],
  'ActiveRecord::Polymorphic associations': ['Polymorphic associations', 'as: :commentable'],
  'ActiveRecord::Counter cache': ['Counter cache', 'optimize counts'],
  'Database::SQL': ['SQL', 'SELECT, JOIN'],
  'Database::Relations': ['Relations', 'foreign keys'],
  'Database::Indexes': ['Indexes', 'optimization'],
  'Frontend::Forms': ['Forms', 'Rails forms'],
  'Frontend::Turbo': ['Turbo', 'interactivity'],
  'Frontend::Stimulus': ['Stimulus', 'lightweight JS'],
  'Frontend::Importmap / Propshaft': ['Importmap / Propshaft', 'asset pipeline'],
  "Config & Env::Variables d'env": ['Environment variables', '.env, credentials'],
  'Config & Env::Rails credentials': ['Rails credentials', 'encrypted secrets'],
  'Config & Env::config/environments': ['config/environments', 'dev vs prod vs test'],
  'Config & Env::Initializers': ['Initializers', 'boot-time configuration'],
  'Deployment::Heroku / Render / Fly.io': ['Heroku / Render / Fly.io', 'deploy an app'],
  'Deployment::Migrations en prod': ['Production migrations', 'db:migrate on deploy'],
  "Deployment::Variables d'env prod": ['Production env vars', 'server configuration'],
  'Deployment::Logs prod': ['Production logs', 'read logs'],
  'Auth::Devise': ['Devise', 'authentication'],
  'Auth::Roles': ['Roles', 'admin/user'],
  'Auth::Policies (Action Policy)': ['Policies (Action Policy)', 'user permissions'],
  'Auth::authorize!': ['authorize!', 'controller access control'],
  'Auth::Policy Scope': ['Policy Scope', 'data filtering'],
  'Testing::RSpec': ['RSpec', 'unit tests'],
  'Testing::FactoryBot': ['FactoryBot', 'test data'],
  'Testing::Request specs': ['Request specs', 'API tests'],
  'Testing::Mocks & Stubs': ['Mocks & Stubs', 'allow, expect'],
  'Testing::System tests': ['System tests', 'UI tests'],
  'Testing::Policy testing': ['Policy testing', 'permission tests'],
  'Testing::Shared examples': ['Shared examples', 'DRY tests'],
  'Git::Basics': ['Basics', 'commit, push, pull'],
  'Git::Branching': ['Branching', 'branches'],
  'Git::Pull Requests': ['Pull Requests', 'code review workflow'],
  'Git::Debug git': ['Debug git', 'logs, reset'],
  'Git::Rebase': ['Rebase', 'clean history'],
  'Debugging::Logs': ['Logs', 'Rails logs'],
  'Debugging::Console': ['Console', 'rails console'],
  'Debugging::Byebug / Pry': ['Byebug / Pry', 'breakpoints'],
  'Debugging::Stack trace': ['Stack trace', 'errors'],
  'Emails::ActionMailer': ['ActionMailer', 'send emails'],
  'Emails::Mail previews': ['Mail previews', 'test emails'],
  'Emails::Async emails': ['Async emails', 'email jobs'],
  'Storage::Active Storage': ['Active Storage', 'file uploads'],
  'Storage::Attachments': ['Attachments', 'files linked to models'],
  'Storage::Validations fichiers': ['File validations', 'size/type'],
  'Storage::Signed IDs': ['Signed IDs', 'file security'],
  'Jobs::ActiveJob': ['ActiveJob', 'async jobs'],
  'Jobs::Sidekiq': ['Sidekiq', 'background jobs'],
  'Jobs::Retry jobs': ['Retry jobs', 'error handling'],
  'API::JSON': ['JSON', 'API responses'],
  'API::REST': ['REST', 'best practices'],
  'API::Serializers': ['Serializers', 'blueprinter, jsonapi'],
  'API::Pagination': ['Pagination', 'limit data'],
  'API::Versioning API': ['API versioning', '/api/v1'],
  'Realtime::Turbo Streams': ['Turbo Streams', 'realtime UI'],
  'Realtime::ActionCable': ['ActionCable', 'websocket'],
  'Search & Pages::Ransack': ['Ransack', 'filters'],
  'Search & Pages::Kaminari': ['Kaminari', 'pagination'],
  'Files & Export::CSV export': ['CSV export', 'data export'],
  'Files & Export::PDF export': ['PDF export', 'Prawn, WickedPDF'],
  'Security::CSRF': ['CSRF', 'protection'],
  'Security::Strong params': ['Strong params', 'filtering'],
  'Security::CORS': ['CORS', 'cross-origin config'],
  'Security::XSS': ['XSS', 'protection'],
  'Security::Rate limiting': ['Rate limiting', 'rack-attack'],
  'Security::File security': ['File security', 'secure uploads'],
  'Performance::Bullet gem': ['Bullet gem', 'detect N+1'],
  'Performance::Queries optimisation': ['Query optimization', 'improve database access'],
  'Performance::Caching': ['Caching', 'Rails.cache'],
  'Architecture::Clean code': ['Clean code', 'readability'],
  'Architecture::Service Objects': ['Service Objects', 'business logic'],
  'Architecture::Refactoring': ['Refactoring', 'improve code'],
  'Architecture::Form Objects': ['Form Objects', 'multi-model forms'],
  'Architecture::Query Objects': ['Query Objects', 'isolate complex queries'],
  'Web::HTTP': ['HTTP', 'GET, POST'],
  'Web::Status codes': ['Status codes', '200, 404'],
  'Web::Sessions': ['Sessions', 'cookies'],
  'Web::Headers HTTP': ['HTTP headers', 'auth, content-type'],
  'Advanced::Data integrity': ['Data integrity', 'database consistency'],
  'Advanced::Monitoring': ['Monitoring', 'production logs'],
  'Advanced::Concurrency': ['Concurrency', 'race conditions'],
  'Soft Skills::Communication': ['Communication', 'explain code'],
  'Soft Skills::Lecture code': ['Reading code', 'understand a project'],
  'Soft Skills::Autonomie': ['Autonomy', 'solve problems independently'],
  'Soft Skills::Documentation': ['Documentation', 'README, inline docs'],
  'Soft Skills::Compréhension métier': ['Business understanding', 'business logic'],
};

export function localizedCategory(cat, lang) {
  if (lang !== 'en') return cat;
  return categoryEn[cat] || cat;
}

export function localizedPhase(phase, lang) {
  if (lang !== 'en') return phase;
  return { ...phase, ...phaseEn[phase.id] };
}

export function localizedTopic(topic, lang) {
  if (lang !== 'en') return topic;
  const label = topicEn[topicKey(topic)];
  if (!label) return topic;
  return { ...topic, name: label[0], sub: label[1], cat: localizedCategory(topic.cat, lang) };
}
