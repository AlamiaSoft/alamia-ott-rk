'use server'

import { cookies } from 'next/headers'

const CMS_BASE_URL = process.env.CMS_INTERNAL_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:4000'

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  try {
    const res = await fetch(`${CMS_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.errors?.[0]?.message || 'Invalid email or password' }
    }

    // Set cookie
    if (data.token) {
      cookies().set('payload-token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('[Auth Action] Login error:', error)
    return { success: false, error: 'Connection to server failed' }
  }
}

export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !password || !name) {
    return { success: false, error: 'Name, email, and password are required' }
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match' }
  }

  try {
    const res = await fetch(`${CMS_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, role: 'subscriber' }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.errors?.[0]?.message || 'Failed to create account' }
    }

    // Immediately log them in
    return await loginUser(formData)
  } catch (error) {
    console.error('[Auth Action] Registration error:', error)
    return { success: false, error: 'Connection to server failed' }
  }
}

export async function logoutUser() {
  cookies().delete('payload-token')
  return { success: true }
}

export async function getCurrentUser() {
  const token = cookies().get('payload-token')?.value

  if (!token) {
    return { user: null }
  }

  try {
    const res = await fetch(`${CMS_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      return { user: null }
    }

    const data = await res.json()
    return { user: data.user || null }
  } catch (error) {
    console.error('[Auth Action] Get current user error:', error)
    return { user: null }
  }
}
