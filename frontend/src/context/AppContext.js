import React, { createContext, useEffect, useState } from 'react';
import api from '../services/apiService';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState([]);
  const [dashboard, setDashboard] = useState({ totalAppointments: 0, totalProviders: 0, upcomingAppointments: 0 });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/providers');
      if (response.data.success) {
        setProviders(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const query = [];
      if (searchQuery) query.push(`customerName=${encodeURIComponent(searchQuery)}`);
      if (providerFilter) query.push(`providerId=${encodeURIComponent(providerFilter)}`);
      if (dateFilter) query.push(`appointmentDate=${encodeURIComponent(dateFilter)}`);
      const url = `/appointments${query.length ? `?${query.join('&')}` : ''}`;
      const response = await api.get(url);
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = () => {
    const now = new Date();
    const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.appointmentDate) > now).length;
    setDashboard({
      totalAppointments: appointments.length,
      totalProviders: providers.length,
      upcomingAppointments,
    });
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [searchQuery, providerFilter, dateFilter]);

  useEffect(() => {
    refreshDashboard();
  }, [appointments, providers]);

  return (
    <AppContext.Provider
      value={{
        appointments,
        providers,
        dashboard,
        loading,
        searchQuery,
        setSearchQuery,
        providerFilter,
        setProviderFilter,
        dateFilter,
        setDateFilter,
        fetchAppointments,
        fetchProviders,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
