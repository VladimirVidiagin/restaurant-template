import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import HomePage from '@pages/HomePage';
import LoyaltyProgramPage from '@pages/LoyaltyProgramPage';
import DeliveryPage from '@pages/DeliveryPage';
import AboutPage from '@pages/AboutPage';
import CartPage from '@pages/CartPage';
import DishPage from '@pages/DishPage';
import Header from '@widgets/Header';
import Sider from '@widgets/Sider';
import BottomNavigation from '@widgets/BottomNavigation/ui/BottomNavigation';
import { menuCategories, type MenuCategoryId } from '@entities/menu/model';

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  color: #111111;
`;

const MainLayout = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 799px) {
    padding: 12px 12px 78px 12px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<MenuCategoryId>('coldStarters');
  const [scrollToDishSlug, setScrollToDishSlug] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { categoryId?: MenuCategoryId; scrollToSlug?: string } | null;

    if (!state) {
      return;
    }

    if (state.categoryId && state.categoryId !== selectedCategoryId) {
      setSelectedCategoryId(state.categoryId);
    }

    if (state.scrollToSlug) {
      setScrollToDishSlug(state.scrollToSlug);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate, selectedCategoryId]);

  return (
    <AppShell>
      <Header />
      <MainLayout>
        <ContentArea>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  menuCategories={menuCategories}
                  selectedCategoryId={selectedCategoryId}
                  onSelectCategory={setSelectedCategoryId}
                  scrollToDishSlug={scrollToDishSlug ?? undefined}
                />
              }
            />
            <Route path="/loyalty" element={<LoyaltyProgramPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/menu/:dishSlug" element={<DishPage />} />
          </Routes>
        </ContentArea>
        <Sider
          categories={menuCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </MainLayout>
      <BottomNavigation />
    </AppShell>
  );
}

export default App;
