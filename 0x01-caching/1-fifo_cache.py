#!/usr/bin/env python3
"""
FIFOCache module
"""

BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFOCache class inherits from BaseCaching and implements a caching system
    using the First-In-First-Out (FIFO) algorithm.
    """
    def __init__(self):
        """
        Initialize the FIFOCache.
        """
        super().__init__()
        self._keys = []

    def put(self, key, item):
        """
        Add an item to the cache.

        If key or item is None, this method does nothing.
        If the number of items in self.cache_data > than BaseCaching.MAX_ITEMS
            Discard the first item put in the cache (FIFO algorithm).
            Print DISCARD: with the key discarded and a new line.
        """
        if key and item:
            if len(self.cache_data) > BaseCaching.MAX_ITEMS - 1:
                if key not in self.cache_data.keys():
                    print("DISCARD: {}".format(self._keys[0]))
                    self.cache_data.pop(self._keys[0])
                    self._keys.pop(0)
            self.cache_data[key] = item
            if key not in self._keys:
                self._keys.append(key)

    def get(self, key):
        """
        Get an item from the cache by key.

        If key is None or if the key doesn’t exist in self.cache_data
        return None.
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
