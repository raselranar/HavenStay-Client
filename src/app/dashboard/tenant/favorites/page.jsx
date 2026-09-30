import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { Heart } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const FavoritesTable = dynamic(() => import("./FavoritesTable.client"));

// meta data
export const metadata = {
  title: "My Favorites",
  description: "Your favorite properties",
};

const FavoritesPage = async () => {
  const session = await getUserSession();

  const favorites = await protectedFetch(
    `/api/properties/favorites/?userId=${session?.session?.userId}`,
  );


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          Favorites
        </h2>
      </div>

      {!favorites || favorites.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="mx-auto mb-4 w-12 h-12 text-gray-300" />
          <p className="text-gray-500">You have no favorites yet.</p>
        </div>
      ) : (
        <div>
          {/* Client component renders a table and handles removal */}
          <FavoritesTable
            initialFavorites={favorites}
            userId={session?.session?.userId}
          />
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
