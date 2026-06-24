import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from './logger';

export class StorageService {
  static async save(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      Logger.log(`Data saved to storage: ${key}`);
    } catch (error) {
      Logger.error(`Error saving to storage: ${key}`, error);
      throw error;
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      Logger.error(`Error reading from storage: ${key}`, error);
      throw error;
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      Logger.log(`Data removed from storage: ${key}`);
    } catch (error) {
      Logger.error(`Error removing from storage: ${key}`, error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      Logger.log('Storage cleared');
    } catch (error) {
      Logger.error('Error clearing storage', error);
      throw error;
    }
  }
}
