# 🔌 API Reference — Supabase Queries

Ce fichier documente toutes les requêtes Supabase utilisées dans le projet.

---

## Auth

```js
// Inscription
await supabase.auth.signUp({ email, password, options: { data: { full_name, username } } })

// Connexion
await supabase.auth.signInWithPassword({ email, password })

// Déconnexion
await supabase.auth.signOut()

// Session courante
const { data: { session } } = await supabase.auth.getSession()

// Écouter les changements d'auth
supabase.auth.onAuthStateChange((event, session) => { … })
```

---

## Clubs

```js
// Liste tous les clubs actifs
supabase.from('clubs').select('*').eq('is_active', true)

// Détail d'un club par slug
supabase.from('clubs').select('*').eq('slug', 'coding').single()
```

---

## Posts

```js
// Tous les posts publiés (tri chrono desc)
supabase.from('posts')
  .select('*, clubs(id,slug,name,logo_emoji,color), profiles(id,full_name,avatar_url), post_likes(user_id)')
  .eq('is_published', true)
  .order('created_at', { ascending: false })
  .limit(20)

// Posts d'un club
supabase.from('posts').select('*').eq('club_id', clubId).eq('is_published', true)

// Créer un post (club_admin seulement)
supabase.from('posts').insert({ club_id, title, content, image_url, author_id })

// Modifier
supabase.from('posts').update({ title, content }).eq('id', postId)

// Supprimer
supabase.from('posts').delete().eq('id', postId)

// Liker un post
supabase.from('post_likes').insert({ post_id: postId, user_id: userId })

// Unliker
supabase.from('post_likes').delete().match({ post_id: postId, user_id: userId })
```

---

## Commentaires

```js
// Commentaires d'un post
supabase.from('comments')
  .select('*, profiles(id, full_name, avatar_url)')
  .eq('post_id', postId)
  .is('parent_id', null)       // commentaires de premier niveau
  .order('created_at', { ascending: true })

// Ajouter un commentaire
supabase.from('comments').insert({ post_id, author_id, content, parent_id: null })

// Réponse à un commentaire
supabase.from('comments').insert({ post_id, author_id, content, parent_id: commentId })
```

---

## Vidéos / Reels

```js
// Toutes les vidéos publiées
supabase.from('videos')
  .select('*, clubs(*), profiles(id, full_name, avatar_url)')
  .eq('is_published', true)
  .order('created_at', { ascending: false })

// Incrémenter les vues (RPC function)
supabase.rpc('increment_video_views', { video_id: videoId })

// Créer (upload vidéo via Storage, puis insert)
supabase.from('videos').insert({
  club_id, author_id, title, description,
  video_url, thumbnail_url, duration_sec
})
```

---

## Stories

```js
// Stories actives (non expirées)
supabase.from('stories')
  .select('*, clubs(*), profiles(id, full_name, avatar_url)')
  .gt('expires_at', new Date().toISOString())
  .order('created_at', { ascending: false })

// Marquer une story comme vue
supabase.from('story_views').insert({ story_id, user_id })

// Créer une story (expire dans 24h automatiquement)
supabase.from('stories').insert({ club_id, author_id, media_url, media_type, caption })
```

---

## Messages directs

```js
// Historique d'une conversation
supabase.from('direct_messages')
  .select('*, sender:profiles!sender_id(id, full_name, avatar_url)')
  .or(`and(sender_id.eq.${me},receiver_id.eq.${partner}),and(sender_id.eq.${partner},receiver_id.eq.${me})`)
  .order('created_at', { ascending: true })

// Envoyer un message
supabase.from('direct_messages').insert({ sender_id, receiver_id, content, media_url })

// Marquer comme lu
supabase.from('direct_messages')
  .update({ is_read: true })
  .eq('receiver_id', myId).eq('sender_id', partnerId)

// Temps réel (Realtime)
supabase.channel('dm:xxx')
  .on('postgres_changes', { event:'INSERT', schema:'public', table:'direct_messages', filter:`receiver_id=eq.${myId}` }, cb)
  .subscribe()
```

---

## Canaux d'équipe

```js
// Canaux d'un club
supabase.from('channels')
  .select('*')
  .eq('club_id', clubId)
  .order('position', { ascending: true })

// Messages d'un canal
supabase.from('channel_messages')
  .select('*, author:profiles(id, full_name, avatar_url)')
  .eq('channel_id', channelId)
  .order('created_at', { ascending: true })
  .limit(100)

// Envoyer dans un canal
supabase.from('channel_messages').insert({ channel_id, author_id, content })

// Realtime
supabase.channel(`channel:${channelId}`)
  .on('postgres_changes', { event:'INSERT', schema:'public', table:'channel_messages', filter:`channel_id=eq.${channelId}` }, cb)
  .subscribe()
```

---

## Notifications

```js
// Mes notifications
supabase.from('notifications')
  .select('*')
  .eq('user_id', myId)
  .order('created_at', { ascending: false })
  .limit(30)

// Tout marquer lu
supabase.from('notifications')
  .update({ is_read: true })
  .eq('user_id', myId).eq('is_read', false)

// Realtime
supabase.channel(`notifs:${myId}`)
  .on('postgres_changes', { event:'INSERT', schema:'public', table:'notifications', filter:`user_id=eq.${myId}` }, cb)
  .subscribe()
```

---

## Présence (Realtime)

```js
const channel = supabase.channel('presence:global', { config: { presence: { key: userId } } })
channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState() // { userId: [{user_id, online_at}] }
  })
  .subscribe(async status => {
    if (status === 'SUBSCRIBED') await channel.track({ user_id: userId })
  })
```

---

## Storage — Upload

```js
// Upload avatar
supabase.storage.from('avatars').upload(`${uid}/avatar.jpg`, file, { upsert: true })

// URL publique
supabase.storage.from('avatars').getPublicUrl(`${uid}/avatar.jpg`)

// URL signée (bucket privé 'videos')
supabase.storage.from('videos').createSignedUrl(`${uid}/${videoId}.mp4`, 3600)

// Supprimer
supabase.storage.from('posts-images').remove([`${uid}/${postId}.jpg`])
```
