import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import DevLayout from '@/Layouts/DevLayout.vue';
import SchoolLayout from '@/Layouts/SchoolLayout.vue';

/**
 * Composable to get the appropriate admin layout based on user role
 * @returns {Object} Object containing layout component and user role helpers
 */
export function useAdminLayout() {
    const page = usePage();

    const user = computed(() => page.props.auth.user);
    const userRole = computed(() => user.value?.role);
    const isDev = computed(() => userRole.value === 'dev');
    const isAdmin = computed(() => userRole.value === 'admin');
    const isSchool = computed(() => userRole.value === 'school');

    const Layout = computed(() => {
        if (isDev.value) return DevLayout;
        if (isSchool.value) return SchoolLayout;
        return AdminLayout;
    });

    return {
        Layout,
        user,
        userRole,
        isDev,
        isAdmin,
        isSchool,
    };
}
