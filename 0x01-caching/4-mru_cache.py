#!/usr/bin/python3
"""
MRUCache module
"""

BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache class inherits from BaseCaching and implements a caching system
    using the Most Recently Used (MRU) algorithm.
    """
    def __init__(self):
        """
        Initialize the MRUCache.
        """
        super().__init__()
        self.keys = []

    def put(self, key, item):
        """
        Add an item to the cache.

        If key or item is None, this method does nothing.
        If the number of items in self.cache_data > than BaseCaching.MAX_ITEMS
            Discard the most recently used item (MRU algorithm).
            Print DISCARD: with the key discarded and a new line.
        """
        if key is not None and item is not None:
            self.cache_data[key] = item
            if key not in self.keys:
                self.keys.append(key)
            else:
                self.keys.append(self.keys.pop(self.keys.index(key)))
            if len(self.keys) > BaseCaching.MAX_ITEMS:
                discard = self.keys.pop(-2)
                del self.cache_data[discard]
                print('DISCARD: {:s}'.format(discard))

    def get(self, key):
        """
        Get an item from the cache by key.

        If key is None or if the key doesn’t exist in self.cache_data,
        return None.
        Update the order to reflect the most recently used item.
        """
        if key is not None and key in self.cache_data:
            self.keys.append(self.keys.pop(self.keys.index(key)))
            return self.cache_data[key]
        return None
