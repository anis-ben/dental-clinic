import { supabase } from '@/lib/supabase/client';
import { Service } from '@/types';
import { ServiceFormValues } from '@/lib/validations/service';

export const servicesService = {
  /**
   * Fetch all active dental services for public front-end
   */
  async getActiveServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching active services:', error);
      throw new Error(error.message);
    }
    return data || [];
  },

  /**
   * Fetch all services for admin CRUD management
   */
  async getAllServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all services:', error);
      throw new Error(error.message);
    }
    return data || [];
  },

  /**
   * Create a new dental service
   */
  async createService(values: ServiceFormValues): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .insert([values])
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Update an existing service record
   */
  async updateService(id: string, values: Partial<ServiceFormValues>): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .update(values)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service:', error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Toggle service active status
   */
  async toggleActive(id: string, currentStatus: boolean): Promise<Service> {
    return this.updateService(id, { active: !currentStatus });
  },

  /**
   * Delete a service record
   */
  async deleteService(id: string): Promise<void> {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      console.error('Error deleting service:', error);
      throw new Error(error.message);
    }
  },
};
