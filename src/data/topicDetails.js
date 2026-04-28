export const references = {
  rubyDocs: { label: 'Ruby Docs', url: 'https://docs.ruby-lang.org/en/master/' },
  enumerable: { label: 'Ruby Enumerable', url: 'https://docs.ruby-lang.org/en/master/Enumerable.html' },
  railsGettingStarted: { label: 'Rails Getting Started', url: 'https://guides.rubyonrails.org/getting_started.html' },
  railsRouting: { label: 'Rails Routing Guide', url: 'https://guides.rubyonrails.org/routing.html' },
  railsControllers: { label: 'Action Controller Overview', url: 'https://guides.rubyonrails.org/action_controller_overview.html' },
  railsLayouts: { label: 'Layouts and Rendering', url: 'https://guides.rubyonrails.org/layouts_and_rendering.html' },
  railsForms: { label: 'Rails Form Helpers', url: 'https://guides.rubyonrails.org/form_helpers.html' },
  arBasics: { label: 'Active Record Basics', url: 'https://guides.rubyonrails.org/active_record_basics.html' },
  arAssociations: { label: 'Active Record Associations', url: 'https://guides.rubyonrails.org/association_basics.html' },
  arValidations: { label: 'Active Record Validations', url: 'https://guides.rubyonrails.org/active_record_validations.html' },
  arMigrations: { label: 'Active Record Migrations', url: 'https://guides.rubyonrails.org/active_record_migrations.html' },
  railsTesting: { label: 'Rails Testing Guide', url: 'https://guides.rubyonrails.org/testing.html' },
  activeStorage: { label: 'Active Storage Overview', url: 'https://guides.rubyonrails.org/active_storage_overview.html' },
  actionMailer: { label: 'Action Mailer Basics', url: 'https://guides.rubyonrails.org/action_mailer_basics.html' },
  railsSecurity: { label: 'Rails Security Guide', url: 'https://guides.rubyonrails.org/security.html' },
  rspec: { label: 'RSpec Rails Docs', url: 'https://rspec.info/documentation/8.0/rspec-rails/' },
  supabasePasswords: { label: 'Supabase Password Auth', url: 'https://supabase.com/docs/guides/auth/passwords' },
  deviseGithub: { label: 'Devise GitHub', url: 'https://github.com/heartcombo/devise' },
  actionPolicyGithub: { label: 'Action Policy GitHub', url: 'https://github.com/palkan/action_policy' },
  actionPolicyDocs: { label: 'Action Policy Docs', url: 'https://actionpolicy.evilmartians.io/' },
  sidekiqGithub: { label: 'Sidekiq GitHub', url: 'https://github.com/sidekiq/sidekiq' },
  factoryBotGithub: { label: 'FactoryBot GitHub', url: 'https://github.com/thoughtbot/factory_bot' },
  ransackGithub: { label: 'Ransack GitHub', url: 'https://github.com/activerecord-hackery/ransack' },
  ransackDocs: { label: 'Ransack Docs', url: 'https://activerecord-hackery.github.io/ransack/' },
  kaminariGithub: { label: 'Kaminari GitHub', url: 'https://github.com/kaminari/kaminari' },
  rackAttackGithub: { label: 'Rack::Attack GitHub', url: 'https://github.com/rack/rack-attack' },
};

export const topicDetails = {
  'Ruby::Syntaxe de base': {
    goal: 'Lire et écrire du Ruby simple sans bloquer sur la syntaxe.',
    learn: ['Variables et types de base', 'Conditions if/elsif/else', 'Boucles et itérations simples', 'Méthodes et valeurs de retour'],
    exercise: 'Écris un script qui reçoit une liste de rendez-vous et affiche uniquement ceux qui sont confirmés.',
    mistake: 'Penser que Ruby exige toujours un return explicite. La dernière expression est souvent retournée automatiquement.',
    meditrack: 'Toute la logique métier de MediTrack reposera sur des méthodes Ruby lisibles dans les models, services et policies.',
    refs: ['rubyDocs'],
  },
  'Ruby::Structures de données': {
    goal: 'Choisir correctement entre Array et Hash pour représenter des données.',
    learn: ['Array pour listes ordonnées', 'Hash pour objets clé/valeur', 'Accès, ajout, suppression', 'Itération sur une collection'],
    exercise: 'Modélise une liste de médecins avec nom, spécialité et nombre de rendez-vous.',
    mistake: 'Mettre des hashes imbriqués partout alors qu’un model ActiveRecord sera plus clair plus tard.',
    meditrack: 'Les params Rails, les réponses JSON et les options de formulaires utilisent souvent Hash et Array.',
    refs: ['rubyDocs'],
  },
  'Ruby::Enumerable': {
    goal: 'Manipuler des collections Ruby avec map, select, reject, reduce, group_by.',
    learn: ['Transformer une liste', 'Filtrer des éléments', 'Grouper par attribut', 'Calculer un total ou une statistique'],
    exercise: 'À partir d’une liste de rendez-vous, groupe-les par statut puis compte chaque groupe.',
    mistake: 'Utiliser each quand map/select rendraient l’intention plus claire.',
    meditrack: 'Utile pour dashboards, exports CSV, préparation de données et statistiques admin.',
    refs: ['enumerable'],
  },
  'Rails::MVC': {
    goal: 'Comprendre la séparation Model, View, Controller dans Rails.',
    learn: ['Model: données et règles métier', 'Controller: orchestration requête/réponse', 'View: rendu HTML', 'Routes: point d’entrée'],
    exercise: 'Dessine le trajet complet GET /appointments depuis la route jusqu’à la vue.',
    mistake: 'Mettre de la logique métier lourde dans les controllers ou les views.',
    meditrack: 'AppointmentsController liste les RDV, Appointment porte les validations, les vues affichent les cards.',
    refs: ['railsGettingStarted', 'railsControllers'],
  },
  'Rails::Routing': {
    goal: 'Créer des routes REST claires et prédictibles.',
    learn: ['resources', 'routes nested', 'path helpers', 'member vs collection'],
    exercise: 'Crée les routes REST pour appointments et une route dashboard admin.',
    mistake: 'Créer des routes custom pour tout au lieu d’utiliser resources.',
    meditrack: 'Les patients créent des appointments, les médecins les confirment, les admins ont un dashboard.',
    refs: ['railsRouting'],
  },
  'Rails::Controllers': {
    goal: 'Écrire des actions controller courtes, sécurisées et lisibles.',
    learn: ['params', 'before_action', 'redirect_to/render', 'status codes', 'strong params'],
    exercise: 'Implémente create/update/destroy pour Appointment avec gestion success/failure.',
    mistake: 'Faire des requêtes complexes et de longues règles métier directement dans l’action.',
    meditrack: 'AppointmentsController doit rester fin; les règles de réservation pourront partir dans un service.',
    refs: ['railsControllers'],
  },
  'Rails::Views': {
    goal: 'Construire des vues ERB maintenables avec partials.',
    learn: ['ERB', 'partials', 'locals', 'layouts', 'helpers'],
    exercise: 'Crée un partial _appointment_card.html.erb réutilisable pour patient, doctor et admin.',
    mistake: 'Dupliquer le même HTML dans plusieurs vues au lieu d’extraire un partial.',
    meditrack: 'Les cards RDV, badges de statut et profils médecins doivent être réutilisables.',
    refs: ['railsLayouts'],
  },
  'ActiveRecord::Associations': {
    goal: 'Modéliser correctement les relations entre tables Rails.',
    learn: ['belongs_to', 'has_many', 'class_name', 'foreign_key', 'dependent'],
    exercise: 'Modélise Appointment avec doctor_id et patient_id qui pointent tous les deux vers User.',
    mistake: 'Oublier class_name quand deux associations pointent vers le même model.',
    meditrack: 'Appointment appartient à un patient et à un médecin; c’est le cœur du domaine.',
    refs: ['arAssociations'],
  },
  'ActiveRecord::Validations': {
    goal: 'Empêcher les données invalides d’entrer en base.',
    learn: ['presence', 'uniqueness', 'custom validations', 'errors', 'valid?/save!'],
    exercise: 'Empêche un rendez-vous sans date ou avec une date dans le passé.',
    mistake: 'Compter uniquement sur le frontend pour valider les données.',
    meditrack: 'Les rendez-vous, disponibilités et profils médecins doivent être cohérents côté model.',
    refs: ['arValidations'],
  },
  'ActiveRecord::Migrations': {
    goal: 'Faire évoluer le schema de base proprement.',
    learn: ['create_table', 'add_column', 'references', 'indexes', 'rollback'],
    exercise: 'Écris les migrations User, DoctorProfile, Appointment et Availability.',
    mistake: 'Modifier une ancienne migration déjà partagée au lieu d’en créer une nouvelle.',
    meditrack: 'Le schema MediTrack doit être stable avant de construire controllers et policies.',
    refs: ['arMigrations'],
  },
  'Frontend::Forms': {
    goal: 'Créer des formulaires Rails fiables et agréables.',
    learn: ['form_with', 'labels', 'selects', 'datetime fields', 'affichage erreurs'],
    exercise: 'Crée le formulaire de réservation avec médecin, date/heure et notes patient.',
    mistake: 'Ne pas afficher les erreurs model après un submit invalide.',
    meditrack: 'La prise de rendez-vous dépend d’un formulaire clair et robuste.',
    refs: ['railsForms'],
  },
  'Auth::Devise': {
    goal: 'Ajouter une authentification Rails standard.',
    learn: ['installation', 'User model', 'before_action authenticate_user!', 'helpers current_user'],
    exercise: 'Protège toutes les pages appointments sauf la landing page.',
    mistake: 'Mélanger authentification (qui es-tu ?) et autorisation (as-tu le droit ?).',
    meditrack: 'Patients, médecins et admins doivent tous être authentifiés avant d’accéder à leur espace.',
    refs: ['deviseGithub', 'railsSecurity'],
  },
  'Auth::Policies (Action Policy)': {
    goal: 'Centraliser les règles d’autorisation.',
    learn: ['policy classes', 'authorize!', 'authorized_scope', 'roles', 'tests de policies'],
    exercise: 'Crée une AppointmentPolicy pour patient, doctor et admin.',
    mistake: 'Faire des if current_user.admin? dispersés dans tous les controllers.',
    meditrack: 'Un patient ne voit que ses RDV, un médecin ses consultations, un admin tout.',
    refs: ['actionPolicyDocs', 'actionPolicyGithub', 'railsSecurity'],
  },
  'Auth::authorize!': {
    goal: 'Appliquer l’autorisation explicitement dans les actions sensibles.',
    learn: ['authorize record', 'policy methods', 'gestion des refus', 'messages d’erreur propres'],
    exercise: 'Ajoute authorize @appointment dans show, update, destroy.',
    mistake: 'Charger un record puis oublier d’appeler la policy avant de répondre.',
    meditrack: 'Confirmer ou annuler un rendez-vous doit passer par une policy.',
    refs: ['actionPolicyDocs', 'actionPolicyGithub'],
  },
  'Auth::Policy Scope': {
    goal: 'Filtrer les collections selon le rôle utilisateur.',
    learn: ['Scope classes', 'resolve', 'current_user', 'relations ActiveRecord'],
    exercise: 'Fais en sorte que index affiche seulement les RDV visibles pour le rôle connecté.',
    mistake: 'Appliquer l’autorisation sur chaque record après avoir déjà chargé toute la table.',
    meditrack: 'Patient, médecin et admin ne doivent pas voir les mêmes rendez-vous.',
    refs: ['actionPolicyDocs', 'actionPolicyGithub', 'arBasics'],
  },
  'Testing::RSpec': {
    goal: 'Spécifier le comportement attendu de ton app Rails.',
    learn: ['model specs', 'request specs', 'system specs', 'expectations', 'fixtures/factories'],
    exercise: 'Teste qu’un rendez-vous sans scheduled_at est invalide.',
    mistake: 'Tester seulement le happy path et ignorer les cas d’erreur.',
    meditrack: 'Les validations, policies et flows de réservation doivent être couverts.',
    refs: ['rspec', 'railsTesting'],
  },
  'Testing::FactoryBot': {
    goal: 'Créer des données de test lisibles et réutilisables.',
    learn: ['factories', 'traits', 'associations', 'build vs create'],
    exercise: 'Crée des factories User, DoctorProfile et Appointment.',
    mistake: 'Créer trop de données inutiles dans chaque test, ce qui ralentit la suite.',
    meditrack: 'Les tests de policies et appointments seront beaucoup plus simples avec des factories.',
    refs: ['factoryBotGithub', 'rspec'],
  },
  'Testing::Request specs': {
    goal: 'Tester les endpoints Rails comme un vrai client HTTP.',
    learn: ['GET/POST/PATCH/DELETE', 'status codes', 'redirects', 'JSON responses'],
    exercise: 'Teste qu’un visiteur non connecté est redirigé quand il accède à /appointments.',
    mistake: 'Tester seulement les models et oublier les routes/controllers.',
    meditrack: 'Les flows patient et admin doivent être validés de bout en bout.',
    refs: ['rspec', 'railsTesting'],
  },
  'Storage::Active Storage': {
    goal: 'Gérer les fichiers uploadés dans Rails.',
    learn: ['has_one_attached', 'has_many_attached', 'variants', 'stockage local/cloud', 'sécurité'],
    exercise: 'Ajoute une photo de profil au médecin et affiche une miniature.',
    mistake: 'Autoriser tous les types de fichiers sans validation.',
    meditrack: 'Les médecins peuvent avoir une photo/avatar sur leur profil public.',
    refs: ['activeStorage'],
  },
  'Emails::ActionMailer': {
    goal: 'Envoyer des emails transactionnels depuis Rails.',
    learn: ['mailers', 'previews', 'deliver_now/deliver_later', 'templates', 'config SMTP'],
    exercise: 'Envoie un email de confirmation après création d’un rendez-vous.',
    mistake: 'Tester les emails uniquement en production.',
    meditrack: 'Patients et médecins reçoivent confirmations et rappels.',
    refs: ['actionMailer'],
  },
  'Jobs::Sidekiq': {
    goal: 'Exécuter des jobs Rails en arrière-plan avec un worker robuste.',
    learn: ['ActiveJob adapter', 'workers', 'Redis', 'retry', 'queues'],
    exercise: 'Configure Sidekiq pour envoyer un rappel de rendez-vous 24h avant.',
    mistake: 'Mettre du travail lent dans une requête HTTP au lieu de le déléguer à un job.',
    meditrack: 'Les emails de confirmation et de rappel doivent partir en arrière-plan.',
    refs: ['sidekiqGithub', 'actionMailer'],
  },
  'Jobs::ActiveJob': {
    goal: 'Utiliser l’API Rails standard pour les jobs asynchrones.',
    learn: ['perform_later', 'queue_as', 'arguments sérialisables', 'adapters'],
    exercise: 'Crée ReminderJob qui reçoit un appointment_id et envoie un email.',
    mistake: 'Passer des objets complexes/non sérialisables comme arguments de job.',
    meditrack: 'Les rappels et notifications peuvent être planifiés proprement avec ActiveJob.',
    refs: ['sidekiqGithub'],
  },
  'Security::CSRF': {
    goal: 'Comprendre pourquoi Rails protège les formulaires contre les requêtes forgées.',
    learn: ['authenticity token', 'sessions', 'cookies', 'protect_from_forgery'],
    exercise: 'Vérifie que tes formulaires Rails incluent le token CSRF.',
    mistake: 'Désactiver CSRF globalement pour corriger une erreur API.',
    meditrack: 'Les actions sensibles comme annuler/confirmer un RDV doivent rester protégées.',
    refs: ['railsSecurity'],
  },
  'Security::Rate limiting': {
    goal: 'Limiter les abus sur les endpoints sensibles.',
    learn: ['throttling', 'blocklists', 'safelists', 'cache store', 'réponses 429'],
    exercise: 'Ajoute une limite sur les tentatives de login ou les créations de rendez-vous.',
    mistake: 'Installer rack-attack sans définir de règles concrètes.',
    meditrack: 'Les endpoints d’auth et de réservation doivent résister aux abus simples.',
    refs: ['rackAttackGithub', 'railsSecurity'],
  },
  'Search & Pages::Ransack': {
    goal: 'Ajouter une recherche Rails sans infra externe.',
    learn: ['search object', 'predicates', 'forms de recherche', 'tri', 'ransackable attributes'],
    exercise: 'Ajoute une recherche des rendez-vous par statut, médecin et date.',
    mistake: 'Autoriser tous les attributs à être cherchés sans réfléchir à la sécurité.',
    meditrack: 'Le dashboard admin doit filtrer rapidement les rendez-vous.',
    refs: ['ransackDocs', 'ransackGithub'],
  },
  'Search & Pages::Kaminari': {
    goal: 'Paginer les listes longues proprement.',
    learn: ['page', 'per', 'helpers de pagination', 'custom views'],
    exercise: 'Pagine les rendez-vous admin à 10 éléments par page.',
    mistake: 'Charger des centaines de lignes en une seule page.',
    meditrack: 'Les listes de rendez-vous et médecins resteront rapides et lisibles.',
    refs: ['kaminariGithub'],
  },
  'Supabase::Auth': {
    goal: 'Comprendre le flow email/password côté Supabase.',
    learn: ['signUp', 'signInWithPassword', 'resetPasswordForEmail', 'updateUser', 'RLS'],
    exercise: 'Crée un compte, change le nom, puis change le mot de passe depuis la page compte.',
    mistake: 'Mettre une service_role key dans le frontend. Utilise seulement la publishable/anon key.',
    meditrack: 'La progression Rails Dev Path est sauvegardée par utilisateur dans Supabase.',
    refs: ['supabasePasswords'],
  },
};

export function getTopicDetail(topic, lang = 'fr', displayTopic = topic) {
  if (lang === 'en') {
    return {
      goal: `Understand ${displayTopic.name} well enough to use it in a real Rails application.`,
      learn: [
        `What ${displayTopic.name} means and when to use it`,
        `How it fits into the ${displayTopic.cat} part of a Rails app`,
        'A minimal practical example',
        'Common limits, tradeoffs, and mistakes',
      ],
      exercise: `Build a small MediTrack example that uses ${displayTopic.name}, then write down what changed in the code.`,
      mistake: 'Reading the theory without applying it in a concrete Rails example.',
      meditrack: `${displayTopic.name} can connect to MediTrack through authentication, appointments, dashboards, security, production, or project structure.`,
      refs: pickDefaultRefs(topic),
    };
  }

  const exact = topicDetails[`${topic.cat}::${topic.name}`];
  if (exact) return exact;

  return {
    goal: `Comprendre ${topic.name} et savoir l'utiliser dans une app Rails réelle.`,
    learn: [
      `Définition et rôle de ${topic.name}`,
      `Cas d’usage dans la catégorie ${topic.cat}`,
      'Exemple minimal dans une app Rails',
      'Limites et pièges courants',
    ],
    exercise: `Ajoute un petit exemple lié à ${topic.name} dans MediTrack, puis note ce que tu as appris.`,
    mistake: 'Lire uniquement la théorie sans l’appliquer dans un mini cas concret.',
    meditrack: `${topic.name} peut être relié à une feature MediTrack: auth, rendez-vous, dashboard, sécurité ou production.`,
    refs: pickDefaultRefs(topic),
  };
}

function pickDefaultRefs(topic) {
  if (topic.cat === 'Ruby') return ['rubyDocs'];
  if (topic.cat === 'Rails') return ['railsGettingStarted'];
  if (topic.cat === 'ActiveRecord' || topic.cat === 'Database') return ['arBasics'];
  if (topic.cat === 'Testing') return ['railsTesting', 'rspec'];
  if (topic.cat === 'Auth') return ['deviseGithub', 'actionPolicyDocs'];
  if (topic.cat === 'Jobs') return ['sidekiqGithub'];
  if (topic.cat === 'Search & Pages') return ['ransackGithub', 'kaminariGithub'];
  if (topic.cat === 'Storage') return ['activeStorage'];
  if (topic.cat === 'Emails') return ['actionMailer'];
  if (topic.cat === 'Security') return ['railsSecurity', 'rackAttackGithub'];
  return ['railsGettingStarted'];
}
