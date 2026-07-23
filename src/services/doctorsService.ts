import { supabase } from '@/lib/supabase/client';
import { Doctor } from '@/types';
import { DoctorFormValues } from '@/lib/validations/doctor';

export const doctorsService = {
  /**
   * Fetch all active doctors for public display
   */
  async getActiveDoctors(): Promise<Doctor[]> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('active', true)
      .order('years_experience', { ascending: false });

    if (error) {
      console.error('Error fetching active doctors:', error);
      throw new Error(error.message);
    }
    return data || [];
  },

  /**
   * Fetch all doctors for admin control panel
   */
  async getAllDoctors(): Promise<Doctor[]> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all doctors:', error);
      throw new Error(error.message);
    }
    return data || [];
  },

  /**
   * Create a new doctor
   */
  async createDoctor(values: DoctorFormValues): Promise<Doctor> {
    const { data, error } = await supabase
      .from('doctors')
      .insert([values])
      .select()
      .single();

    if (error) {
      console.error('Error creating doctor:', error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Update an existing doctor record
   */
  async updateDoctor(id: string, values: Partial<DoctorFormValues>): Promise<Doctor> {
    const { data, error } = await supabase
      .from('doctors')
      .update(values)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating doctor:', error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Toggle doctor active status
   */
  async toggleActive(id: string, currentStatus: boolean): Promise<Doctor> {
    return this.updateDoctor(id, { active: !currentStatus });
  },

  /**
   * Delete a doctor record
   */
  async deleteDoctor(id: string): Promise<void> {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) {
      console.error('Error deleting doctor:', error);
      throw new Error(error.message);
    }
  },
};
