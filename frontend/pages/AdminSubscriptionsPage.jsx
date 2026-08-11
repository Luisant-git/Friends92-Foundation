import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { X, Plus, Edit2 } from 'lucide-react';

const AdminSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [newPlan, setNewPlan] = useState({
    name: '',
    amount: '',
    description: '',
  });

  const PAGE_SIZE = 10;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchSubscriptions();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${apiUrl}/alumni/membership-plans`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${apiUrl}/alumni/subscriptions/all`);
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isEditing = !!editingPlan;
      const url = isEditing 
        ? `${apiUrl}/alumni/membership-plan/${editingPlan.id}`
        : `${apiUrl}/alumni/membership-plan`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPlan.name,
          amount: Number(newPlan.amount),
          description: newPlan.description,
        }),
      });

      if (response.ok) {
        toast.success(isEditing ? 'Membership Plan updated successfully' : 'Membership Plan created successfully');
        closeModal();
        fetchPlans();
      } else {
        toast.error(isEditing ? 'Failed to update plan' : 'Failed to create plan');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error saving plan');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingPlan(null);
    setNewPlan({ name: '', amount: '', description: '' });
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      amount: plan.amount,
      description: plan.description || ''
    });
    setShowCreateModal(true);
  };

  const confirmDeletePlan = async () => {
    try {
      const response = await fetch(`${apiUrl}/alumni/membership-plan/${deleteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Plan deleted');
        fetchPlans();
      }
    } catch (error) {
      toast.error('Error deleting plan');
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${apiUrl}/alumni/subscription/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        toast.success(`Subscription ${status}`);
        fetchSubscriptions();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating status');
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (statusFilter && sub.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (
        !(sub.alumni?.name?.toLowerCase().includes(term) ||
          sub.alumni?.mobile?.toLowerCase().includes(term) ||
          sub.plan?.name?.toLowerCase().includes(term) ||
          sub.transactionId?.toLowerCase().includes(term))
      ) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedSubscriptions = filteredSubscriptions.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 font-heading">Manage Membership Plans & Renewals</h2>
        <button 
          onClick={() => {
            setEditingPlan(null);
            setNewPlan({ name: '', amount: '', description: '' });
            setShowCreateModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Plan
        </button>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Plans</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan.id} className="p-5 border border-gray-200 rounded-xl flex flex-col hover:shadow-md transition bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 text-lg">{plan.name}</h4>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-semibold transition flex items-center gap-1"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                    <button 
                      onClick={() => { setDeleteId(plan.id); setShowDeleteModal(true); }}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold transition"
                      title="Delete Plan"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-grow">{plan.description || "No description provided."}</p>
                <p className="text-xl font-bold text-green-600">₹{plan.amount}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full">No plans created yet.</p>
          )}
        </div>
      </div>

      {/* History Table */}
      <h3 className="text-xl font-bold text-gray-800 mb-4 font-heading">Renewal Requests & History</h3>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by alumni name, mobile, plan or transaction ID..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full max-w-2xl px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          {(searchTerm || statusFilter) && (
            <button
              onClick={() => { setSearchTerm(''); setStatusFilter(''); setCurrentPage(1); }}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Alumni</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Plan Selected</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Amount (₹)</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Year</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Transaction ID</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubscriptions.length > 0 ? (
              paginatedSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">
                    {sub.alumni?.name}
                    <div className="text-xs text-gray-500">{sub.alumni?.mobile}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {sub.plan?.name || 'Custom/Legacy'}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-green-600">₹{sub.amount}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{sub.renewalYear || '-'}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{sub.transactionId || '-'}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      sub.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      sub.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {sub.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(sub.id, 'APPROVED')} className="text-green-600 hover:underline">Approve</button>
                        <button onClick={() => updateStatus(sub.id, 'REJECTED')} className="text-red-600 hover:underline">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No subscription records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredSubscriptions.length > PAGE_SIZE && (
          <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredSubscriptions.length)}</span> to{' '}
              <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredSubscriptions.length)}</span> of{' '}
              <span className="font-medium">{filteredSubscriptions.length}</span> records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    page === safePage
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Plan Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl relative animate-slide-up">
            <h3 className="text-xl font-bold mb-4 text-gray-800 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this membership plan? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePlan}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
              >
                Delete Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-slide-up">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{editingPlan ? 'Edit Membership Plan' : 'Create New Plan'}</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yearly Basic, Lifetime Premium"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={newPlan.amount}
                    onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    rows="3"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition disabled:opacity-50 mt-4 shadow-md"
                >
                  {loading ? 'Saving...' : editingPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSubscriptionsPage;
