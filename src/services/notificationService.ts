
import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id?: string;
  training_event_id: string;
  title: string;
  body: string;
  sent_at?: Date;
  scheduled_for?: Date;
  status?: 'pending' | 'sent' | 'failed';
  created_at?: Date;
}

export interface DeviceToken {
  id?: string;
  user_id: string;
  device_token: string;
  device_type?: string;
  created_at?: Date;
  last_used_at?: Date;
  is_active?: boolean;
}

/**
 * Retrieves all notifications from the database
 */
export const getNotifications = async () => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

/**
 * Creates a notification in the database
 */
export const createNotification = async (notification: Notification) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

/**
 * Placeholder for sending a push notification
 * Will be implemented with Firebase Cloud Messaging
 */
export const sendPushNotification = async (notification: Notification, deviceTokens: string[]) => {
  // This is a placeholder function that will be implemented when Firebase is set up
  console.log("Would send push notification to devices:", deviceTokens);
  console.log("Notification data:", notification);
  
  // For now, we'll just update the status to 'sent' in the database
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        status: 'sent',
        sent_at: new Date().toISOString() 
      })
      .eq('id', notification.id)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw error;
  }
};

/**
 * Register a device token for push notifications
 */
export const registerDeviceToken = async (deviceToken: DeviceToken) => {
  try {
    // Check if the token already exists
    const { data: existingToken } = await supabase
      .from('device_tokens')
      .select('*')
      .eq('device_token', deviceToken.device_token)
      .single();
      
    if (existingToken) {
      // Update existing token
      const { data, error } = await supabase
        .from('device_tokens')
        .update({
          last_used_at: new Date().toISOString(),
          is_active: true,
          device_type: deviceToken.device_type
        })
        .eq('id', existingToken.id)
        .select();
        
      if (error) throw error;
      return data[0];
    } else {
      // Create new token
      const { data, error } = await supabase
        .from('device_tokens')
        .insert(deviceToken)
        .select();
        
      if (error) throw error;
      return data[0];
    }
  } catch (error) {
    console.error("Error registering device token:", error);
    throw error;
  }
};

/**
 * Deactivate a device token
 */
export const deactivateDeviceToken = async (token: string) => {
  try {
    const { data, error } = await supabase
      .from('device_tokens')
      .update({ is_active: false })
      .eq('device_token', token)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error deactivating device token:", error);
    throw error;
  }
};
